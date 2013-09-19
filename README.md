# nomzsavior

The goal of *nomzsavior* is to provide a way to:

* Track your groceries
* Know when a product will expire
* Know what to eat first

Thus saving the environment and keeping your wallet full.

*nomzsavior* works offline, thanks to HTML5's Appcache.  
The data is stored on the browser, thanks to HTML5's LocalStorage.

## Requirements
This application needs Local Storage in order to work, which means you cannot use
it without a HTTP server, i.e. simply by accessing *index.html* from your disk.  

On Mac OS X, just browse to the application's root, and run

    (python -m SimpleHTTPServer 1337 > /dev/null 2&>1) &

You can also use [Mongoose](https://code.google.com/p/mongoose/) which is a light
and easy to use HTTP server (`mongoose -p 8001 &`).

## Launching the app
Visit *index.html*: `open index.html`.

## Runing the tests
Visit *run-specs.html*: `open run-specs.html`.

## Thanks
A part of the application was built during a *hackday* in [Zenexity](http://zenexity.com/).  
Thanks to the managers for their organization that allowed this to happen.

Thanks to [my collegues who have contributed](https://github.com/Dinduks/nomzsavior/graphs/contributors)
during that day.

And big thanks to [Jérémy](https://github.com/JeremDsgn) who took care of the
design part and who did a great and hard job.
