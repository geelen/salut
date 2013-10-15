# Salut!

A chat client for the people on your wifi. No log in, no worries.

# Command line version

    npm install
    node salut.js

# Building

You'll need node-webkit. Download it from https://github.com/rogerwang/node-webkit and put it in your `/Applications` directory.

To run it up:

    npm install
    cd node_modules/mdns
    nw-gyp rebuild --target=0.7.5
    cd -
    /Applications/node-webkit.app/Contents/MacOS/node-webkit .

To ship a new version

    rm -rf ../Salut.app
    cp -R /Applications/node-webkit.app ../Salut.app
    cp -R . ../Salut.app/Contents/Resources/app.nw

# Devving

    bower install
    npm install
    node_modules/.bin/wach -o 'styles/*' "node_modules/.bin/node-sass styles/main.scss styles.css; node_modules/.bin/autoprefixer styles.css" &
    live-server &
