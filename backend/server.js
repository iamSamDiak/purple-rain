const express = require('express');
const fs = require('fs');
const app = express();
const hostname = "0.0.0.0"
const port = 3000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello, world');
})

app.post('/savePoints', (req, res) => {
  const points = JSON.stringify(req.body);
  const uuid = uuidv4();

  fs.writeFile(`temp/${uuid}.json`, points, (error) => {
    if (error) {
      console.error('Error writing file:', error);
      return res.status(500).send('Error saving points');
    }

    res.send({link : `http://localhost:3000/file/${uuid}`})

  });
});

app.get('/file/:link_download', (req, res) => {
  const linkDownload =  `temp/${req.params.link_download}.json`;

  if (fs.existsSync(linkDownload)) {
    res.setHeader('Content-Disposition', 'attachment; filename=sauvegarde-record.json');
    res.setHeader('Content-Type', 'application/octet-stream');
  
    fs.createReadStream(linkDownload)
    .pipe(res)
    .on('close', () => {
      try {
        fs.promises.unlink(linkDownload);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    })
  } else {
    console.log('File does not exist');
  }
});

app.listen(port, hostname, () => {
  console.log(`Serveur sur ${port}!`)
});