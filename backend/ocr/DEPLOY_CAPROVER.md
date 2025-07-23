# Deploy OCR Service ไปยัง CapRover

## วิธีที่ 1: Deploy จาก GitHub Repository (แนะนำ)

### ขั้นตอน:

1. **เข้า CapRover Dashboard**
   - ไปที่ `Apps` section
   - คลิก `Create New App`

2. **สร้าง App**
   - App Name: `textbot-ocr`
   - Has Persistent Data: ไม่ต้องเลือก

3. **Deploy จาก GitHub**
   - ไปที่ tab `Deployment`
   - เลือก `Deploy from GitHub/GitLab/Bitbucket`
   - Repository: `https://github.com/yokthanwa1993/textBot`
   - Branch: `main`
   - **Relative Path in Repo**: `backend/ocr`  ← สำคัญมาก!

4. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   GOOGLE_APPLICATION_CREDENTIALS=/app/google-credentials.json
   ```

5. **Enable HTTPS**
   - เปิด `Enable HTTPS`
   - Force HTTPS: เปิด

6. **Deploy**
   - คลิก `Deploy Now`

## วิธีที่ 2: Manual Upload

1. **สร้าง Archive**
   ```bash
   cd backend/ocr
   tar -czf ocr-deploy.tar.gz \
     --exclude=node_modules \
     --exclude=.git \
     --exclude=*.log \
     .
   ```

2. **Upload ใน CapRover**
   - เลือก `Upload tar file`
   - Upload `ocr-deploy.tar.gz`

## ทดสอบการทำงาน

หลัง deploy เสร็จ ทดสอบ endpoints:

```bash
# Health check
curl https://textbot-ocr.your-domain.com/health

# OCR test
curl -X POST https://textbot-ocr.your-domain.com/ocr/url \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/image.jpg"
  }'
```

## หมายเหตุสำคัญ

- ⚠️ **Relative Path in Repo**: ต้องใส่ `backend/ocr` เพื่อให้ CapRover deploy แค่ subfolder นี้
- 🔧 **Port**: OCR service จะรันบน port 3001
- 🔐 **Google Credentials**: ต้องอัพโหลด `google-credentials.json` แยกหรือใส่ใน Secret
- 📡 **Health Check**: มี endpoint `/health` สำหรับตรวจสอบสถานะ
