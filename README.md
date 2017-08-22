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

Inform a different template instead of the availables in [Front Templates](https://github.com/front-templates) repositories:

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

Change the development server host:

```bash
front start --host 192.168.0.0
```

#### --port (default: 3000)

Change the development server port:

```bash
front start --port 8080
```

#### --no-notify (default: false)

Disable Front CLI notifications:

```bash
front start --no-notify
```

#### --config (default: build/webpack.config.dev.js)

Specify which webpack config file Front CLI should use:

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

Disable Front CLI notifications:

```bash
front build --no-notify
```

#### --config (default: build/webpack.config.prod.js)

Specify which webpack config file Front CLI should use:

```bash
front build --config some/path/some.webpack.config.js
```