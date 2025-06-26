const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// In-memory storage
const submissions = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission
app.post('/admission', (req, res) => {
  const { fullName, email, phone, course } = req.body;
  submissions.push({ fullName, email, phone, course });
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Submission Successful</title>
      <link rel="stylesheet" href="/style.css">
      <style>
        .response-container {
          background: #fff;
          max-width: 400px;
          margin: 60px auto 0 auto;
          padding: 32px 28px 24px 28px;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          box-sizing: border-box;
          text-align: center;
        }
        .response-container h2 {
          color: #2d3a4b;
          margin-bottom: 18px;
        }
        .response-container p {
          color: #3a4a5d;
          font-size: 1.1rem;
        }
        .response-container a {
          display: inline-block;
          margin-top: 18px;
          padding: 10px 22px;
          background: linear-gradient(90deg, #66a6ff 0%, #89f7fe 100%);
          color: #fff;
          border-radius: 7px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s, transform 0.1s;
        }
        .response-container a:hover {
          background: linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%);
          transform: translateY(-2px) scale(1.02);
        }
      </style>
    </head>
    <body>
      <div class="response-container">
        <h2>Thank you, ${fullName}!</h2>
        <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
        <a href="/admission">Submit another response</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/admission`);
});
