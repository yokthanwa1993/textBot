import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './line/schema/typeDefs.js';
import { resolvers } from './line/resolvers/index.js';
import { LineService } from './line/services/lineService.js';
import { WebhookHandler } from './line/webhook/handler.js';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 4000;

// CORS middleware
app.use(cors());

// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize LINE service
const lineService = new LineService();

// Initialize Webhook handler
const webhookHandler = new WebhookHandler(lineService);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// Apply GraphQL middleware
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      lineService,
      headers: req.headers,
    }),
  })
);

// LINE Webhook endpoint (temporary without signature verification)
app.post('/webhook', express.json(), async (req, res) => {
  try {
    console.log('Webhook received:', JSON.stringify(req.body, null, 2));
    const results = await webhookHandler.handleEvents(req.body.events || []);
    res.json(results);
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed', details: err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Webhook info endpoint
app.get('/webhook-info', (req, res) => {
  res.json({
    webhookUrl: `${req.protocol}://${req.get('host')}/webhook`,
    graphqlUrl: `${req.protocol}://${req.get('host')}/graphql`,
    status: 'Ready to receive LINE webhooks'
  });
});

app.listen(port, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
  console.log(`🔗 LINE Webhook ready at http://localhost:${port}/webhook`);
  console.log(`📊 Health check at http://localhost:${port}/health`);
  console.log(`ℹ️  Webhook info at http://localhost:${port}/webhook-info`);
});