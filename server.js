require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const INSTANCE_ID = process.env.INSTANCE_ID;
const TOKEN = process.env.TOKEN;

// Endpoint usado pelo Ultramsg
app.post("/webhook", async (req, res) => {
    console.log("Mensagem recebida:", req.body);

    const from = req.body.from;
    const message = req.body.body;

    await axios.post(`https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`, {
        token: TOKEN,
        to: from,
        body: `Bot ativo! Você enviou: ${message}`
    });

    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.send("Bot está online!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
