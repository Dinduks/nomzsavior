# Mange pas ça

## TODO

* Confirm message after adding an iten
* Icon or animation on Add button after adding element
* Welcome message
* Improve data picker
* Beautiful icon

## Requirements
You need npm & grunt (`npm install -g grunt-cli`).

This application needs Local Storage in order to work, which means you cannot use
it without a HTTP server, i.e. simply by accessing *index.html* from your disk.  
I personally use *Mongoose* to create a light web server with my current working
directory as a root.  
Install it and run it: `brew install mongoose && mongoose -p 1337 &`

## Setup
`npm install`

## Compiling the TypeScript scripts
`./build.sh`

## Run the tests
`open run-specs.html`
