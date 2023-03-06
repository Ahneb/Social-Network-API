const express = require('express');
const db = require('./config/connection');
const mainRouter = require('./routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mainRouter);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}!`);
  });
});