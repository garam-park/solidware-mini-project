import config from '../config'
import server from '../server/main'
import _debug from 'debug'
import { MongoClient } from 'mongodb'
import Sentinel from '../src/functions/Sentinel'

let MONGO_URI = process.env.MONGODB_URL||"NOT FOUND";
let GRAPHQL_URL = process.env.GRAPHQL_URL||"NOT FOUND";

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

debug("MONGO_URI is "+MONGO_URI);
// debug("GRAPHQL_URL is "+GRAPHQL_URL);

MongoClient.connect(
  MONGO_URI,
  (err,database) => {

    if(err) throw err;

    Sentinel.newInstance(database);
    server.listen(port)

    // app.listen(3000, () => console.log("Listening on port 3000"));
  }
)

debug(`Server is now running at http://${host}:${port}.`)
