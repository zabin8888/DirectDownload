const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const directoryPath = path.join(__dirname,"Resources"); // 设置为当前目录

app.get('/', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading the directory');
      return;
    }

    let content = '<h1>playful内部资源盘</h1><ul>';
    files.forEach((file) => {
      // 创建指向文件的链接
      content += `<li><a href="/download/${file}">${file}</a></li>`;
    });
    content += '</ul>';

    res.send(content);
  });
});

// 用于下载文件的端点
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(directoryPath, filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
