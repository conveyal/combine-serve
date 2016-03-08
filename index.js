#!/usr/bin/env node
/** Combine multiple APIs together and serve them as one */

import connect from 'connect'
import proxy from 'proxy-middleware'
import serveStatic from 'serve-static'

// parse the arguments
let args = process.argv.slice(2)

let app = connect()

let port = 7941

// will be left undefined if user does not specify host
let host

for (let i = 0; i < args.length; i += 3) {
  let mode = args[i]
  let path = args[i + 1]
  let target = args[i + 2]

  if (!path.startsWith('/')) path = '/' + path

  if (mode === '--proxy') {
    app.use(path, proxy(target))
  } else if (mode === '--serve') {
    app.use(path, serveStatic(target))
  } else if (mode === '--port') {
    port = Number(args[i + 1])
    i-- // only one option
  } else if (mode === '--host') {
    host = args[i + 1]
    i-- // only one option
  }
}

app.listen(port, host)

console.log(`Listening for HTTP on port ${port} ${host ? 'and host ' + host : ''}`)
