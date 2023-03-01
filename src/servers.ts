require('dotenv').config();
const server = require('./v1/app.ts');
const port =  process.env.PORT;

server.listen(port, () => {
  console.log(`Server start on ${port}`);
});
process.on('SIGINT', () => {
  server.close(() => console.log(`exits server express`));
});
