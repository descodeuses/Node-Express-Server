const data = require('./data.json');
const express = require('express');
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const port = 5050;
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// START ENTRYPOINTS 
app.get('/', (req, res) => {
    res.send('Hello World').status(200);
});

// ENTITY ITEM
// get all | read all
app.get('/api/items', (req, res) => {
    res.send(data).status(200);
});

// get one | read one
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) res.send(item).status(200);
    else res.send('Item not found').status(404);
});

// create 
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

// edit 
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

// delete 
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) {
        data.splice(data.indexOf(item), 1);
        res.send({ message : "Item successfully deleted !" }).status(200);
    } else res.send('Item not found').status(404);
});

// ENTITY POST
app.get('/api/posts', async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.send(response.data).status(200);
});

// SCRAPING `Laptops` & `mini-computers` & `accessories` FROM 
// https://laptopwithlinux.com/linux-laptops/
// https://laptopwithlinux.com/mini-computers/ 
// https://laptopwithlinux.com/accessories/
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

app.listen(port, () => console.log(`Server is listening on port ${port}`));