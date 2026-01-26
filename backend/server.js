const express = require('express');
const fs = require('fs');
const patch = require('path');
const app = express();

app.use(express.static(patch.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/pixels', (req, res) => {
    fs.readFile('./data.json','utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: "Não consegui ler o arquivo" });


        }
        let ListaDePixels = JSON.parse(data);

        const { mapa, categoria } = req.query;

        if (mapa) {
            ListaDePixels = ListaDePixels.filter(p => p.mapa.toLowerCase() === mapa.toLowerCase());
        }
        if (categoria) {
            ListaDePixels = ListaDePixels.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
        }

        res.json(ListaDePixels)
    });
});

app.use('/uploads', express.static('public/uploads'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 http://localhost:3000');
});

