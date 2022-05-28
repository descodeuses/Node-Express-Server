// import data from data.json file  
const data = require('./data.json');
// import express from node_modules/express
const express = require('express');
// import axios from node_modules/axios
const axios = require('axios');
// import jsdom from node_modules/jsdom
const jsdom = require("jsdom");
// following jsdom documentation to create a virtual DOM
const { JSDOM } = jsdom;

// configure a new server port and create a new express app
const port = 5050;
const app = express();

// configure express
// this is a built-in middleware function in Express. 
// it parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// START ENTRYPOINTS 
/*
* @Route : http://localhost:5050/
* @Description : This is the default route.
* @Method : GET
*/
app.get('/', (req, res) => {
    res.send('Hello World').status(200);
});

// ENTITY ITEM
/*
* @Route : http://localhost:5050/api/items
* @Description : Get list of items
* @Method : GET
* @Response : 200 - Success & JSON Array of Objects
*/
app.get('/api/items', (req, res) => {
    res.send(data).status(200);
});

/*
* @Route : http://localhost:5050/api/items/:id
* @Description : Get item by id
* @Method : GET
* @Params : id
* @Response : 404 - Not Found || 200 - Success & JSON Object
*/
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) res.send(item).status(200);
    else res.send('Item not found').status(404);
});

/*
* @Route : http://localhost:5050/api/items/
* @Description : Create new item
* @Method : POST
* @Body : { "name": "Item name", "price": "Item price", "category": "Item category" }
* @Response : 400 - Bad Request || 201 - Created & JSON Object
*/
app.post('/api/items', (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.category) res.send('Missing fields').status(400);
    else {
        const item = {
            id: data.length + 1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        data.push(item);
        res.send({ message : "Item successfully created !", item : item}).status(201);
    }
});

/*
* @Route : http://localhost:5050/api/items/:id
* @Description : Update item by id
* @Method : PATCH
* @Params : id
* @Body : { "name": "Item name" &|| "price": "Item price" &|| "category": "Item category" }
* @Response : 404 - Not Found || 200 - Success & JSON Object
*/
app.patch('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) {
        if (req.body.name) item.name = req.body.name;
        if (req.body.price) item.price = req.body.price;
        if (req.body.category) item.category = req.body.category;
        res.send({ message : "Item successfully edited !", item : item}).status(200);
    } else res.send('Item not found').status(404);
});

/*
* @Route : http://localhost:5050/api/items/:id
* @Description : Delete item by id
* @Method : DELETE
* @Params : id
* @Response : 404 - Not Found || 200 - Success & JSON Object
*/
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) {
        data.splice(data.indexOf(item), 1);
        res.send({ message : "Item successfully deleted !" }).status(200);
    } else res.send('Item not found').status(404);
});

// ENTITY POST
/*
* @Route : http://localhost:5050/api/posts
* @Description : Get list of posts
* @Method : GET
* @Note : Fetch data from https://jsonplaceholder.typicode.com/posts with axios
*/
app.get('/api/posts', async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.send(response.data).status(200);
});


/*
* @Route : http://localhost:5050/api/laptops
* @Description : Get list of laptops
* @Method : GET
* @Note : Scraping `Laptops` & `mini-computers` & `accessories` FROM 
* [https://laptopwithlinux.com/linux-laptops/ , https://laptopwithlinux.com/mini-computers/ , https://laptopwithlinux.com/accessories/]
*/
app.get('/api/laptops', async (req, res) => {
    const url = "https://laptopwithlinux.com/linux-laptops/";
    JSDOM.fromURL(url).then(dom => {
        const results = [];

        const laptopGrid = dom.window.document.getElementById('us_grid_1').querySelectorAll('article');
        laptopGrid.forEach(el => {
            const item = {};
            item.title = el.querySelector('h2').textContent;
            item.image = el.querySelector('img').src;
            item.price = el.querySelector('bdi').textContent;
            item.infos = [];
            const labelInfos = Array.from(el.getElementsByClassName('progress_text'));
            const textInfos = Array.from(el.getElementsByClassName('progress_info'));

            for (let i = 0; i < textInfos.length; i++) {
                item.infos.push({ 'label' : labelInfos[i].textContent, 'value' : textInfos[i].textContent })
            }
            results.push(item);
        });
        res.send(results).status(200);
    });
});

// Server Listenning, /\! Always at the end of the file /\!
app.listen(port, () => console.log(`Server is listening on port ${port}`));