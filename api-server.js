// api-server.js
const app = require('./api/api.js'); // Importa a sua API já definida
const port = 3001; // A porta que seu front-end local espera

app.listen(port, () => {
  console.log(`[API Local] Servidor de desenvolvimento rodando em http://localhost:${port}`);
  console.log('Use Ctrl+C para parar o servidor.');
});