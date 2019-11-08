//IMPORT FROM NODE MODULES
import http from 'http';

// IMPORT FROM SRC
import Routes from './routes';
import { getUrl } from './other/helpers/functions';

// ENVIROMENTS VARIABLES
const port = parseInt(process.env.PORT) || 3000
const ip = process.env.PORT || 'localhost'
const NodeStatic = require('node-static');
var file = new NodeStatic.Server('./src/resources');


const server = http.createServer((req: any, res: any) => {
    const url = getUrl(req.url);
    if(url.pathname.search('views') != -1 || url.pathname.search('assets') != -1){
        req.addListener( 'end', function () {
            file.serve( req, res );
        } ).resume();
    } else {
        Routes.executeRoute(req, res);
    }
});

server.listen(port, ip, () => {
    console.log('Initializing server...');
    console.log(`Server is running http://${ip}:${port}`);
    console.log('For turn off press \'ctrl + c\'');
});