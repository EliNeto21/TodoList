const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost',
    port: 6379
  });
  
// Verificando a conexão
redis.on('connect', () => {
    console.log('Conectado ao Redis!');
});

redis.on('error', (err) => {
    console.error('Erro de conexão com Redis:', err);
});

module.exports = redis;