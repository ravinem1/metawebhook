const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Your verify token (must match the one you set in Meta Developers)
const VERIFY_TOKEN = "kifclothingsecretsauce";

/*
|--------------------------------------------------------------------------
| GET /webhook — Verification
|--------------------------------------------------------------------------
*/
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

/*
|--------------------------------------------------------------------------
| POST /webhook — Receive Events
|--------------------------------------------------------------------------
*/
app.post("/webhook", (req, res) => {
  const body = req.body;

  console.log("Webhook Event Received:");
  console.dir(body, { depth: null });

  // Always respond 200 to avoid repeated retries
  res.sendStatus(200);
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
