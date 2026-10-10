require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});