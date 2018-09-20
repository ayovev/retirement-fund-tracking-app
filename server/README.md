# Server README

## Overview
The backend that React relies on for database interfacing is a REST API built on the Express framework in Node.js. The main goal of this custom API is to provide a service used to facilitate communication between the client-side (served with React) and any database data that it may need to access (accounts, funds, etc.). This also allows for the flexibility of plugging in other microservices later if needed.

## How Does It Work?
So how exactly does React leverage this backend when making requests? In the `package.json` file contained in the client directory, you can see at the very bottom is a `proxy`. What this proxy does is essentially take any local request that React makes and proxies it to a corresponding route on the Express server.

!["How the Proxy Works"](https://daveceddia.com/images/how-proxy-works.png)
