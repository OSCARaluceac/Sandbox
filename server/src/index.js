const { port } = require('./config/env');

app.listen(port, () => {
    console.log(`[SISTEMA]: Protocolo activo en el puerto ${port}. Estoy lista.`);
});