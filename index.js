const express = require('express');

const port = 5050;

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Hello World').status(200);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));