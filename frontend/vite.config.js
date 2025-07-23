import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true, // ไม่ให้เปลี่ยน port อัตโนมัติ
    cors: true,
    allowedHosts: ['liff.wwoom.com', 'localhost', '127.0.0.1'],
    hmr: true, // เปิด hot module replacement
    watch: {
      usePolling: true // ใช้ polling สำหรับการ watch
    }
  }
}) 