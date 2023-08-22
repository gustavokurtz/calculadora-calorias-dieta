const express = require('express');
const path = require('path')

const app = express();
const port = 5000;

// Configurar o body-parser para interpretar os corpos das requisições como JSON
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (_, res) => {
  // res.send('Bem-vindo ao calculador de dieta!');
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para receber os dados da dieta e calcular as calorias
app.post('/calcular-dieta', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const { proteinas, carboidratos, gorduras } = req.body;

  // Calcula as calorias dos macronutrientes
  const caloriasProteinas = proteinas * 4;
  const caloriasCarboidratos = carboidratos * 4;
  const caloriasGorduras = gorduras * 9;

  // Calcula o total de calorias
  const totalCalorias = caloriasProteinas + caloriasCarboidratos + caloriasGorduras;

  const resultado = {
    caloriasProteinas,
    caloriasCarboidratos,
    caloriasGorduras,
    totalCalorias,
  };

  return res.json(resultado);
});

// Inicia o servidor
app.listen(port);

module.exports = app;
