# combine-serve: combine static files and API endpoints and serve them as a unified server

Used to combine frontend and backend processes in development. For instance, if you're using node to develop your frontend and running a Java backend on port 7070:

	combine-serve --serve /client build/ --proxy / http://localhost:7070 --port 7071 --host 127.0.0.1

will create a server running on port 7071 that serves the files in the build directory at http://localhost:7071/client and proxies other requests to http://localhost:7070/.

Specifying the host option allows you to bind to just a single interface; otherwise it will bind to all interfaces.
