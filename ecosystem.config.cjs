module.exports = {
  apps: [
    {
      name: 'line-graphql-api',
      script: 'nodemon',
      args: 'backend/index.js',
      cwd: '/Users/yok/Development/TEXTBot',
      interpreter: 'none',
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      },
      watch: false, // nodemon จัดการ watching เอง
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'frontend-dev',
      script: 'npm',
      args: 'run dev',
      cwd: '/Users/yok/Development/TEXTBot/frontend',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      log_file: './logs/liff-combined.log',
      out_file: './logs/liff-out.log',
      error_file: './logs/liff-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'ocr-api-server',
      script: 'backend/ocr-server.js',
      cwd: '/Users/yok/Development/TEXTBot',
      env: {
        NODE_ENV: 'development',
        OCR_PORT: 3001
      },
      watch: ['backend/ocr', 'backend/ocr-server.js'],
      ignore_watch: ['node_modules', 'logs'],
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      log_file: './logs/ocr-combined.log',
      out_file: './logs/ocr-out.log',
      error_file: './logs/ocr-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'cloudflare-tunnel',
      script: 'cloudflared',
      args: 'tunnel --config cloudflared-config.yml run',
      cwd: '/Users/yok/Development/TEXTBot',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      log_file: './logs/cloudflare-combined.log',
      out_file: './logs/cloudflare-out.log',
      error_file: './logs/cloudflare-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
}; 