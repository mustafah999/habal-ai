const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // تم حذف 'private_code' من هنا
    const htmlPath = path.join(__dirname, 'index.html');
    const cssPath = path.join(__dirname, 'style.css');
    const jsPath = path.join(__dirname, 'script.js');

    let html = fs.readFileSync(htmlPath, 'utf8');
    
    if (fs.existsSync(cssPath)) {
        const css = fs.readFileSync(cssPath, 'utf8');
        html = html.replace('</head>', `<style>${css}</style></head>`);
    }

    if (fs.existsSync(jsPath)) {
        const js = fs.readFileSync(jsPath, 'utf8');
        html = html.replace('</body>', `<script>${js}</script></body>`);
    }
    
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is running!`);
});
