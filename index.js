const express = require("express");
const { Logtail } = require("@logtail/node");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const logtail = new Logtail(process.env.TELEMETRY_BETTERSTACK_KEY);

app.use(express.json());

const logRequest = (req) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  };
  const logEntryString = `${req.method} - ${req.headers.host} - ${req.url}`;
  logtail.info(logEntryString, logEntry);
  logtail.flush();
};

app.all("*", (req, res) => {
  res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to enk.us</title>
            <style>
                /* Global styles for dark mode */
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #121212;
                    color: #ffffff;
                    font-family: 'Arial', sans-serif;
                }

                /* Centered content container */
                .centered {
                    text-align: center;
                }

                /* Styling the main header */
                h1 {
                    font-size: 3rem;
                    font-weight: bold;
                    margin: 0;
                    color: #ffcc00; /* Highlight color */
                }
                
                h2 {
                    font-size: 2.2rem;
                    font-weight: bold;
                    margin: 0;
                    color: #ffcc00; /* Highlight color */
                }

                /* Subtext styling */
                span {
                    font-size: 1.2rem;
                    color: #bbbbbb;
                    display: block;
                    margin-top: 0.5rem;
                }
            </style>
        </head>
        <body>
            <div class="centered">
                <h1>enk.us</h1>
                <h2>welcome</h2>
                <span>simple. fast. responsive.</span>
            </div>
        </body>
        </html>

    `);
  logRequest(req);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
