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

let MONGO_URI = '';

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
