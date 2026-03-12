const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const users = []; 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email.includes('@') || password.length < 6) {
    return res.status(400).send('<h2 style="color:red;">Invalid submission. Please check your input.</h2>');
  }

  users.push({ username, email });

  res.send(`<h2 style="color: green;">Registration successful!</h2><pre>${JSON.stringify(users, null, 2)}</pre>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});