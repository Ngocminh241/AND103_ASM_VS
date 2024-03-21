const express = require('express');

const app = express();

const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server dang chay cong ${port}`)
})

const api = require('./api');
app.use ('/api', api);

const uri = 'mongodb+srv://admin:admin@cluster0.jcetqj6.mongodb.net/ASM'

const fdModel = require('./foodModel');
const mongoose = require('mongoose');

//Kết nối mongodb

app.get('/', async (req, res)=>{
    await mongoose.connect(uri);
    let foods = await fdModel.find();
    console.log(foods);
    res.send(foods);
})

app.post('/add-list', async (req, res) => {
    await mongoose.connect(uri);
    try {
        let item = req.body;
        let food = await fdModel.create(item);
        res.send(food);
        console.log(food);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

exports.fdModel = fdModel;
exports.uri = uri;
exports.mongoose = mongoose;


