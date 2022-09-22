const http = require('http');
const app = require('./app');
// require('dotenv').config();


// Initializing the server & listening on a port
const port = process.env.PORT;
const server = http.createServer(app);


// listen to the Port
server.listen(port, () => {
    console.log(`listening on Port: ${port}`);
});