# DesCodeuses > Promo Annie - 2022
### Project 4 >  Web Scraping & API - Backend Repository

## Express/NodeJS Server
> This is a simple NodeJS server.


### Requirements :

#### NodeJS
> Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser (server-side).
> Documentation: https://nodejs.org/en/

#### npm (Node Package Manager)
> npm is a package manager for the Node.js platform.
> Documentation: https://www.npmjs.com/

### Installation :

- make sure you have NodeJS and npm installed
- clone the repository
- move to the directory and run `npm install` to install all the dependencies
- launch the server with `npm start` (ctrl+c to stop it)
- server is running on port 5050

### Usage :

- server allows all origins (CORS)

- server allows all HTTP methods

- visit http://localhost:5050 to getting welcome message : ```Hello World!```

- server allows you to access the API with the following endpoints:

    - GET list of items : http://localhost:5050/api/items
    - GET item by id : http://localhost:5050/api/items/1 (params: {id: 1})
    - POST a new item : http://localhost:5050/api/items (body: {name: "new name", price: 10, category: "new category"})
    - PATCH an item : http://localhost:5050/api/items/1 (body: {name: "new name", &|| price: 10, &|| category: "new category"})
    - DELETE an item : http://localhost:5050/api/items/1 (params: {id: 1})

    - GET list of posts : http://localhost:5050/api/posts (data fetch from api)
  
    - GET list of laptops : http://localhost:5050/api/laptops (query: {catgeory: "all" || "linux-laptops" || "mini-computers" || "accessories"}) (data fetch from web scraping technique with jsdom library)

### Comments :
All the routes are defined in index.js file.
Code uses ES6 syntax.
Code is commented with JSDoc style.

### Configuration :

#### Express
> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
> Documentation: https://expressjs.com/

#### JSON format output
> JSON (JavaScript Object Notation) is a lightweight data-interchange format.
> Documentation: https://en.wikipedia.org/wiki/JSON


#### Librairies :
- [express](https://expressjs.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [cors](https://www.npmjs.com/package/cors)
- [axios](https://www.npmjs.com/package/axios)
- [jsdom](https://www.npmjs.com/package/jsdom)
  