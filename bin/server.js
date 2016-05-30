import config from '../config'
import server from '../server/main'
import _debug from 'debug'
import { MongoClient } from 'mongodb'
import Sentinel from '../src/functions/Sentinel'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

let MONGO_URI = process.env.MONGODB_URL||"NOT FOUND";

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
