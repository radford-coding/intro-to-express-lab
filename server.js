const express = require('express');
const app = express();
let listener = app.listen(3000, () => {
    console.log(`listening on port ${listener.address().port}`);
});

// 1

app.get('/greetings/:username', (req, res) => {
    res.send(`We have been expecting you, ${req.params.username}`);
});

// 2

app.get('/roll/:number', (req, res) => {
    const regex = /^\d+$/;
    if (!req.params.number.match(regex)) {
        res.send('You must specify a number.');
    } else {
        res.send(`You rolled a ${Math.floor(Math.random() * req.params.number)}.`);
    };
});

// 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    if (typeof collectibles[req.params.index] === 'undefined') {
        res.send('This item is not yet in stock. Check back soon!');
    } else {
        const item = collectibles[req.params.index].name;
        const price = collectibles[req.params.index].price;
        res.send(`So, you want the ${item}? For $${price}, it can be yours!`);
    };
});

// 4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price'] === undefined ? 0 : req.query['min-price'];
    const maxPrice = req.query['max-price'] === undefined ? 10000 : req.query['max-price'];
    // we can use a quirk of JS: calling new RegExp(undefined) returns /(?:)/
    const type = new RegExp(req.query.type);
    res.send(shoes.filter((s) => {
        return s.price >= minPrice && s.price <= maxPrice && s.type.match(type);
    }));
});