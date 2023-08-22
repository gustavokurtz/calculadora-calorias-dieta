const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Configurar o body-parser para interpretar os corpos das requisições como JSON
app.use(bodyParser.json());

app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo ao calculador de dieta!');
});

// Rota para receber os dados da dieta e calcular as calorias
app.post('/calcular-dieta', (req, res) => {
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

  res.json(resultado);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
