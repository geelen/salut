# Salut!

A chat client for the people on your wifi. No log in, no worries.

# Command line version

    npm install
    node salut.js

# Building

You'll need node-webkit.

# Devving

    bower install
    npm install
    node_modules/.bin/wach -o 'styles/*' "node_modules/.bin/node-sass styles/main.scss styles.css; node_modules/.bin/autoprefixer styles.css" &
    live-server &
