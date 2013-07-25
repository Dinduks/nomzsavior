# Mange pas ça

## Requirements
You need npm & grunt (`npm install -g grunt-cli`).

This application needs Local Storage in order to work, which means you cannot use
it without a HTTP server, i.e. simply by accessing *index.html* from your disk.  
I personally use *Mongoose* to create a light web server with my current working
directory as a root.  
Install it and run it: `brew install mongoose && mongoose -p 1337 &`

## Setup
`npm install`

## Compiling the TypeScript scripts (and enabling hot reloading)
`grunt`

## Run the tests
`open run-specs.html`
