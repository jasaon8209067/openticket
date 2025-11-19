// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // 導入我們建立的資料庫連線池

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Middleware 設定 ---
app.use(cors()); 
app.use(express.json()); // 用來解析 JSON 格式的請求主體

// --- 2. 測試資料庫連線 (可選，但推薦) ---
db.getConnection()
    .then(connection => {
        console.log('MySQL/MAMP 連線成功');
        connection.release(); 
    })
    .catch(err => {
        console.error('MySQL/MAMP 連線失敗，請檢查 MAMP 狀態與設定:', err.message);
        process.exit(1); 
    });


// --- 3. API 路由定義 (Endpoint) ---

// [GET] /api/announcements: 獲取公告 (可選 limit 參數)
app.get('/api/announcements', async (req, res) => {
    try {
        const limitStr = req.query.limit; 
        
        let sql = 'SELECT id, title, content, created_at FROM announcement ORDER BY id DESC';
        
        // 1. 強制確保 limit 是一個有效的正整數
        const limit = parseInt(limitStr);
        
        if (!isNaN(limit) && limit > 0) {
            // ❗ 關鍵修正：確保 limit 是一個純淨的數字後再拼接
            // 這是您目前環境唯一可行的做法
            sql += ` LIMIT ${limit}`; 
            
            // ❗ 移除所有 console.log 避免影響效能和後端崩潰
        }
        
        const [rows] = await db.execute(sql);
        
        res.status(200).json(rows); 
    } catch (err) {
        // ❗ 處理錯誤：將後端錯誤打印出來，幫助我們除錯
        console.error('API 獲取公告失敗:', err.message); 
        // 移除原始錯誤訊息，避免將敏感資訊傳回前端
        res.status(500).json({ message: '伺服器內部錯誤，無法載入公告。' });
    }
});
// [POST] /api/items: 新增一個項目
app.post('/api/announcements', async (req, res) => {
    // 從前端請求中取得 title 和 content
    const { title, content } = req.body; 
    
    if (!title || !content) {
        return res.status(400).json({ message: '標題 (title) 和內容 (content) 欄位為必填' });
    }

    try {
        // 插入 SQL 語句：注意欄位名稱
        const sql = 'INSERT INTO announcement (title, content) VALUES (?, ?)';
        const [result] = await db.execute(sql, [title, content]); 
        
        // 返回新增成功的結果
        res.status(201).json({ 
            id: result.insertId,
            title, 
            content 
        }); 
    } catch (err) {
        res.status(400).json({ message: '新增公告失敗', error: err.message });
    }
});


// --- 4. 啟動伺服器 ---
app.listen(PORT, () => {
    console.log(`MySQL API 伺服器運行在 http://localhost:${PORT}`);
});