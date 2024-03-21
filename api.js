const express = require('express');

const router = express.Router();

module.exports = router;

const server = require('./server');

router.get('/', (req, res) => {
    res.send('URI:' + app.uri);
});

router.get('/list', async (req, res) => {
    await server.mongoose.connect(server.uri);

    let sanphams = await server.fdModel.find();

    console.log(sanphams);

    res.send(sanphams);
});

router.post('/add-list', async (req, res) => {
    await server.mongoose.connect(server.uri);
    try {
        let item = req.body;
        let food = await server.fdModel.create(item);
        res.send(food);
        console.log(food);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});