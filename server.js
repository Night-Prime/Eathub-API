const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;

const server = http.createServer(app);


// listen to the Port
server.listen(port, () => {
    console.log(`listening on Port: ${port}`);
});