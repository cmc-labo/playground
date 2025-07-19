const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); 

app.post('/run-rust', (req, res) => {
    const code = req.body.code;

    if (containsDangerousCode(code)) {
        return res.send("⚠️ Insecure syntax was detected.");
    }

    const filename = `temp_${Date.now()}.rs`;
    const filepath = path.join(__dirname, filename);

    fs.writeFileSync(filepath, code);  
    
    const cmd = `sudo docker run --rm --memory=128m --network=none -v ${filepath}:/app/${filename} rust-runner /app/${filename}`;

    exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
        fs.unlinkSync(filepath);

        if (err) {    
            return res.send(`Compilation Error:\n${stderr}`);
        }

        res.send(stdout);
    });
});

const PORT = 3000;
const HOST = '192.168.33.10';
app.listen(PORT, HOST, () => console.log(`http://192.168.33.10:${PORT} で実行中`));

const bannedPatterns = [
    /std::fs/,
    /std::process::Command/,
    /unsafe\s*\{/,
    /thread::spawn/,
    /libc/,
    /std::env::var/,
    /std::net/,
    /std::os/,
  ];
  
  function containsDangerousCode(code) {
    return bannedPatterns.some(pattern => pattern.test(code));
  }