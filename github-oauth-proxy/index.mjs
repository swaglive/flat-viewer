import express from "express";
const app = express();
import cors  from 'cors';
const config = {
  PORT: Number(process.env.PORT) || 8081,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET:
    process.env.CLIENT_SECRET,
  ALLOW_ORIGIN: process.env.ALLOW_ORIGIN
};

app.use(cors({
  origin: config.ALLOW_ORIGIN,
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json());

app.post("/apis/access_token", async (req, res) => {
  const { code, redirect_uri } = req.body;

  const resp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      redirect_uri,
    })
  });

  const text = await resp.text();

  console.log("text", { text, code });
  res.json({
    access_token: new URLSearchParams(text).get("access_token")
  });
});
app.listen(config.PORT, () => {
  console.log(`app listen on ${config.PORT}`);
});
