<p align="center">
    <a href="https://front-cli.github.io">
        <img src="https://raw.githubusercontent.com/front-cli/front-cli/master/logo/logo-lg.png" width="200" alt="Front CLI"/>
    </a>
</p>

> A simple tool to automate front-end projects

## Installation

Having [Node.js](https://nodejs.org) (>= 6) installed, type the following command in the terminal:

```bash
npm install -g front-cli
```

After the installation the `front` command will be available. To confirm that, type the following command in the terminal to see a list with the available front tasks:

```bash
front
```

## Creating the Application

Let's create our first front application! Our application will be called `awesomeApp`. Type the following command in the terminal to create our application:

```bash
front init awesomeApp
```

Answer the questions that will be made and wait while front downloads the application dependencies. After that, the application is ready to start!

### Options

#### --template

Specifies a different template instead of the availables in [Front Templates](https://github.com/front-templates) repositories:

```bash
front init awesomeApp --template github_user/github_repo
```

## Starting the Application

Type the following command in the terminal to enter in the application folder:

```bash
cd awesomeApp
```

Type the following command in the terminal to start our application in development mode:

```bash
front start
```

Now open the address http://localhost:3000 in the browser and you'll see our application running! Change some code in the application and see the browser. The browser refresh automatically!

### Options

#### --host (default: 0.0.0.0)

Changes the development server host:

```bash
front start --host 192.168.0.0
```

#### --port (default: 3000)

Changes the development server port:

```bash
front start --port 8080
```

#### --no-notify (default: false)

Disables Front CLI notifications:

```bash
front start --no-notify
```

#### --config (default: build/webpack.config.dev.js)

Specifies which webpack config file Front CLI should use:

```bash
front start --config some/path/some.webpack.config.js
```

## Building the Application

When you feel that the application is done, you can prepare it for production. This reduces drastically the application size and, believe me, the users will thank you for that. To prepare the application for production, type the following command in the terminal:

```bash
front build
```

Wait a few seconds. Now, all we have to do is to get the `dist` folder and deploy to a webserver.

### Options

#### --no-notify (default: false)

Disables Front CLI notifications:

```bash
front build --no-notify
```

#### --verbose (default: false)

Shows the full webpack compilation status:

```bash
front build --verbose
```

#### --config (default: build/webpack.config.prod.js)

Specifies which webpack config file Front CLI should use:

```bash
front build --config some/path/some.webpack.config.js
```

## Running custom scripts

In Front CLI you can run your custom scripts (deploy, test, etc):

```bash
front run some/path/some-script.js
```

The only rule to be observed is that your script must export a function:

```js
// some/path/some-script.js

module.exports = (require, argv) => {
    // script content
}
```

Some things are given to you as a gift when creating your scripts: `require` and `argv`:

### require

The given `require` parameter is in Front CLI context, so you have access to all Front CLI dependencies without the need to download again, eg `chalk`, `inquirer` and `fs-extra`. With only these dependencies you can create powerful scripts! As expected, if you want to use dependencies outside Front CLI context, you can:

```js
// some/path/some-script.js

// here, `require` is in NodeJS context. You need to download `fs-extra` (npm install fs-extra) to use.
let fs = require('fs-extra');

module.exports = (require, argv) => {
    // here, `require` is in Front CLI context and you can use all of its dependencies.
    let fs = require('fs-extra');
}
```

### argv

The given `argv` parameter could be useful in some situations when you need to pass parameter to your script:

```bash
front run some/path/some-script.js --server="production" --clean
```

The script could use these parameters:

```js
// some/path/some-script.js

module.exports = (require, argv) => {
    let server = argv.server

    // do something

    if (argv.clean) {
        // do something
    } else {
        // do something else
    }
}
```