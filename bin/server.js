import config from '../config'
import server from '../server/main'
import _debug from 'debug'
import { MongoClient } from 'mongodb'
import Sentinel from '../src/functions/Sentinel'
import Schema from '../src/schemas/Schema'
import express from 'express'
import GraphQLHTTP from 'express-graphql'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

let app = express()

let MONGO_URI = 'mongodb://garam:1234@ds017553.mlab.com:17553/garam';

app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});


MongoClient.connect(
  MONGO_URI,
  (err,database) => {

    if(err) throw err;

    app.use('/graphql',GraphQLHTTP({
      schema : Schema(database),
      graphiql:true
    }))

    app.listen(3001, () => console.log("Listening on port 3001"));

    Sentinel.newInstance(database);
    server.listen(port)

    // app.listen(3000, () => console.log("Listening on port 3000"));
  }
)

debug(`Server is now running at http://${host}:${port}.`)
