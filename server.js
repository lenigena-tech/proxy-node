const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
    const target = req.query.url;

    if (!target) {
        return res.status(400).send("Paramètre 'url' manquant.");
    }

    try {
        const response = await fetch(target);
        const body = await response.text();

        res.status(response.status);
        res.send(body);
    } catch (err) {
        res.status(500).send("Erreur proxy : " + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy en écoute sur le port ${PORT}`);
});
