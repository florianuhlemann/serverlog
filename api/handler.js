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
  logRequest(req);
  res.status(200).send(`
        <html>
            <head><title>Placeholder</title></head>
            <body>
                <h1>Placeholder Site</h1>
                <p>Thank you for visiting this site.</p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
