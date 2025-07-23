# TEXTBot 🤖

LINE Bot สำหรับจัดการข้อความและ OCR (Optical Character Recognition) ด้วย GraphQL API

## 🚀 Quick Start

### รันทุก Services ด้วย PM2
```bash
# ลบ PM2 processes ทั้งหมด
pm2 delete all

# รันทุก services จาก ecosystem.config.cjs
pm2 start ecosystem.config.cjs

# ตรวจสอบสถานะ
pm2 list
```

### Services ที่รัน
- **line-graphql-api** (Port 4000) - GraphQL API สำหรับ LINE Bot
- **frontend-dev** (Port 5000) - LIFF Frontend
- **ocr-api-server** (Port 3001) - OCR API Server
- **cloudflare-tunnel** - Cloudflare Tunnel

## 📁 โครงสร้างโปรเจค

```
TEXTBot/
├── backend/                    # Backend services
│   ├── index.js               # GraphQL API server
│   ├── ocr-server.js          # OCR API server
│   ├── line/                  # LINE Bot services
│   │   ├── webhook/handler.js # Webhook handler
│   │   ├── services/          # LINE services
│   │   └── utils/             # Utilities
│   └── src/                   # GraphQL resolvers
├── frontend/                  # LIFF Frontend
│   ├── index.html
│   ├── main.js
│   └── package.json
├── logs/                      # Log files
├── .env                       # Environment variables
└── ecosystem.config.cjs       # PM2 configuration
```

## 🔧 API Endpoints

### GraphQL API (Port 4000)
```
POST http://localhost:4000/graphql
```

### OCR API (Port 3001)
```bash
# OCR จาก URL รูปภาพ
curl -X POST http://localhost:3001/api \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/image.jpg"}'

# OCR จาก base64
curl -X POST http://localhost:3001/api \
  -H "Content-Type: application/json" \
  -d '{"base64":"data:image/jpeg;base64,..."}'

# Health Check
curl http://localhost:3001/health
```

**Response Format:**
```json
{
  "text": "ข้อความที่อ่านได้จากรูปภาพ"
}
```

### LINE Webhook
```
POST /webhook
```

## ⚙️ Environment Variables (.env)

```env
# LINE Bot Configuration
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
LINE_CHANNEL_SECRET=your_channel_secret
LIFF_ID=your_liff_id

# Server Configuration
PORT=4000
NODE_ENV=development

# OCR Configuration
OCR_PORT=3001
GOOGLE_CLOUD_API_KEY=your_google_api_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id

# API URLs
GRAPHQL_URL=https://api.wwoom.com/graphql
```

## 🛠️ Development Commands

### PM2 Commands
```bash
# รัน services
pm2 start ecosystem.config.cjs

# หยุด service เดียว
pm2 stop ocr-api-server

# รีสตาร์ท service
pm2 restart ocr-api-server

# ดู logs
pm2 logs ocr-api-server

# ลบทุก processes
pm2 delete all
```

### Manual Development
```bash
# Backend GraphQL API
cd backend && node index.js

# OCR Server
cd backend && node ocr-server.js

# Frontend
cd frontend && npm run dev
```

## 📋 Features

### LINE Bot
- ✅ รับข้อความและตอบกลับ
- ✅ รับรูปภาพและทำ OCR
- ✅ Flex Message สำหรับ UI
- ✅ LIFF Integration

### OCR Service
- ✅ รองรับ URL รูปภาพ
- ✅ รองรับ base64 รูปภาพ
- ✅ Fallback หลายระดับ:
  1. External OCR Service (ocr.wwoom.com)
  2. Google Cloud Vision API
- ✅ Auto-restart ด้วย PM2

### GraphQL API
- ✅ Query messages
- ✅ Mutation สำหรับส่งข้อความ
- ✅ CORS support

## 🔍 Troubleshooting

### ตรวจสอบ Services
```bash
# ดูสถานะทั้งหมด
pm2 list

# ดู logs
pm2 logs

# ดู logs service เดียว
pm2 logs ocr-api-server --lines 50
```

### ตรวจสอบ Ports
```bash
# ตรวจสอบ port ที่ใช้งาน
lsof -i :3001  # OCR
lsof -i :4000  # GraphQL
lsof -i :5000  # Frontend
```

### รีสตาร์ท Services
```bash
# รีสตาร์ทเฉพาะ OCR
pm2 restart ocr-api-server

# รีสตาร์ททั้งหมด
pm2 restart all
```

## 📝 Notes

- OCR Server จะลองใช้ external service ก่อน แล้วค่อย fallback ไป Google Vision API
- ทุก services มี auto-restart เมื่อเกิดข้อผิดพลาด
- Log files จะถูกเก็บในโฟลเดอร์ `logs/`
- Environment variables โหลดจากไฟล์ `.env` ในโฟลเดอร์หลัก

## 🔗 Links

- [LIFF App](https://liff.line.me/2007783990-0Y48Q7rB)
- [GraphQL Endpoint](https://api.wwoom.com/graphql)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)

---

**Created:** July 22, 2025  
**Last Updated:** July 22, 2025
