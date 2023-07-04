const express = require('express');
const app = express();
const port = 4200;

app.get('/hey', (req, res) => {
  res.send('Hello!')
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});