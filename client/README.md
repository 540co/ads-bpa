# Client

The below instructions only describe testing and serving the client application folder. To build and install the entire application please refer to the [Install Guide](../INSTALL.md) located in the root folder.


## Install /client folder

> To configure for local deployment, edit the `config.js` file.

To install node modules:

```
npm install
```

> This will not install the /server node dependencies since the install at this point is focused on the client layer


To install bower components:

```
bower install
```


To start server:

```
grunt serve
```

To run tests using Karma:

```
grunt test
```

## Routes

Menu

```
http://localhost:9000
```
