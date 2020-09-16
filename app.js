const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})