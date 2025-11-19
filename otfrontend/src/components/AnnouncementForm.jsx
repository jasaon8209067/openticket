// src/components/AnnouncementForm.jsx
import React, { useState } from 'react';

function AnnouncementForm({ onNewAnnouncement }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('發送中...');

        try {
            // Fetch POST 請求設定
            const response = await fetch('/api/announcements', {
                method: 'POST', // 請求方法
                headers: {
                    'Content-Type': 'application/json', // 告訴伺服器發送的是 JSON 資料
                },
                body: JSON.stringify({ // 將 JavaScript 物件轉換為 JSON 字串
                    title: title,
                    content: content,
                }),
            });

            if (!response.ok) {
                // 如果後端返回 4xx 或 5xx 錯誤，解析錯誤訊息
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP 錯誤! 狀態碼: ${response.status}`);
            }

            // 解析成功回傳的 JSON 資料
            const data = await response.json();

            setMessage(`✅ 成功新增公告: ${data.title}`);
            setTitle('');
            setContent('');

            // 如果有回調函式，通知父元件資料已更新
            if (onNewAnnouncement) {
                onNewAnnouncement(data);
            }

        } catch (err) {
            console.error('新增公告失敗:', err);
            setMessage(`❌ 新增失敗: ${err.message}`);
        }
    };

    // (渲染部分與前一個範例相同，這裡省略)

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', padding: '20px', margin: '20px' }}>
            <h3>新增公告 (使用 Fetch POST)</h3>
            <div style={{ marginBottom: '10px' }}>
                <label>標題:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>內容:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '8px', minHeight: '80px' }}
                />
            </div>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                發布公告
            </button>
            <p style={{ marginTop: '10px' }}>{message}</p>
        </form>
    );
}

export default AnnouncementForm;