# Drug Reactions... Explained (DRE) Install Guide

## What is the DRE server and what is included?

The DRE server contains all of the backend components to support the Drug Reactions Explained [DRE] application.

It is comprised of a a single [node.js](https://nodejs.org/) project that uses the [express](http://expressjs.com/) framework.

It is responsible for:

- Acting as a web server for the **DRE Application** front end [angularjs](https://angularjs.org/) application (contained in the `/client` folder)

- Powering the **Reaction Lookup APIs** that provide the application a reaction explanation lookup service

- Hosting the **Reaction Lookup APIs** documentation (powered by [swagger-ui](https://github.com/swagger-api/swagger-ui))

### Prerequisites
* git ([git](https://git-scm.com/))
* node.js ([node.js](https://nodejs.org/))
* MongoDB ([MongoDB](https://www.mongodb.org/))

### You will also need a set of API keys for:
* The [Merriam Webster API](http://www.dictionaryapi.com)
* The [Wordnik API](https://www.wordnik.com/)

# Running the application
1. Clone this repo
2. Change directory to `ads-bpa`

        cd ads-bpa

3. Create configuration files

        # Copy sample config files
        cp client/app/scripts/config-sample.js client/app/scripts/config.js
        cp server/config-sample.js server/config.js

        # Update config files with your hostnames, api keys, and mongo settings
        vim client/app/scripts/config.js
        vim server/config.js

4. Install npm dependencies

        npm install -g bower grunt-cli mocha

5. Change directory to `client` and install npm modules / bower components

        cd client
        npm install
        bower install 
   
   And use grunt to build all dependencies into a single directory.
   
        grunt build

   > NOTE: The Backend Node.js app serves the Frontend AngularJS app.  


6. Change directory to `server` and install npm modules

        cd ../server
        npm install

7. Start mongo and then start the App

        mongod --config /usr/local/etc/mongod.conf # You may need to modify path to mongod.conf
        npm start

8. View App.  Default url is: http://localhost:3000

# Using docker containers

1. Clone this repo
2. Change directory to `ads-bpa`

        cd ads-bpa

3. Create configuration files

        # Copy sample config files
        cp client/app/scripts/config-sample.js client/app/scripts/config.js
        cp server/config-sample.js server/config.js

        # Update config files with your hostnames, api keys, and mongo settings
        vim client/app/scripts/config.js
        vim server/config.js

4. Build a docker image

        # replace [image_name] with the name you want to call the image
        docker build -t [image_name] .

   The above command used the Dockerfile include in the repo.

5. Start the mongo container and then start a container using the image you just built:

        docker pull mongo
        docker run -d --name db mongo

        # replace [image_name] with the name of the image you used in step 4
        docker run -d --name dre -p 3000:3000 --link db:db [image_name]

6. View App.  Default url is: http://localhost:3000
