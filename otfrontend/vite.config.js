// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 🎯 新增的 server 配置區塊
  server: {
    proxy: {
      // 設置代理規則：
      // 當瀏覽器請求以 /api 開頭的路徑時（例如 /api/announcements）
      '/api': {
        // 將該請求轉發到您的後端 API 伺服器
        target: 'http://localhost:5000', 
        
        // 必須設置，它會將請求的主機頭改為 target 的主機頭
        // 這對於後端服務正確識別請求來源至關重要
        changeOrigin: true,
        
      },
    },
  },
})