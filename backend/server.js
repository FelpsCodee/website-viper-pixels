const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/pixels', (req, res) => {
    const caminhoDoArquivo = path.join(__dirname, 'data.json');

    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: "Não consegui ler o arquivo" });
        }

        let ListaDePixels = JSON.parse(data);
        const { mapa, categoria, lado } = req.query;

        if (mapa) {
            ListaDePixels = ListaDePixels.filter(p => p.mapa.toLowerCase() === mapa.toLowerCase());
        }
        
        if (lado) {
            ListaDePixels = ListaDePixels.filter(p => p.lado && p.lado.toLowerCase() === lado.toLowerCase());
        }

        if (categoria) { 
            ListaDePixels = ListaDePixels.filter(p => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase());
        }

        res.json(ListaDePixels);
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});