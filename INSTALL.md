# Drug Reactions... Explained (DRE) Install Guide

DRE contains 3 separate applications:
* Frontend AngularJS App (/client)
* Backend Node.js App (/server)
* Harvest Node.js CLI script (/harvest)

# Prerequisites
* node.js ([node.js](https://nodejs.org/))
* MongoDB ([MongoDB](https://www.mongodb.org/))

# Getting Started
1. Clone this repo
2. Change directory to `ads-bpa`

        cd ads-bpa

3. Install npm dependencies

        npm install -g bower grunt-cli mocha

4. Change directory to `client` and install npm modules / bower components

        cd client
        npm install
        bower install

5. The Backend Node.js app serves the Frontend AngularJS app.  Use grunt to build all dependencies into a single directory.

        grunt build

6. Change directory to `server` and install npm modules

        cd ../server
        npm install

7. Start App

        npm start

# Using docker containers
