require('dotenv').config();
const server = require('./v1/app.ts');
const port = process.env.PORT || 3000;

server.listen(port, () => {
   console.log(`Server start on ${port}`);
});
process.on('SIGINT', () => {
   server.close(() => {
      console.log('Server closed');
      process.exit(2);
   });
});
