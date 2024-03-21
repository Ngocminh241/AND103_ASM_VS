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

// const express = require("express");

// const app = express();

// const port = 3000;

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port, () => {
//   console.log(`Server dang chay cong ${port}`);
// });

// const api = require("./api");
// app.use("/api", api);


// const uri = 'mongodb+srv://admin:admin@cluster0.jcetqj6.mongodb.net/ASM'

// const fdModel = require("./foodModel");
// const mongoose = require("mongoose");

// app.get("/", async (req, res) => {
//   await mongoose.connect(uri);

//   let sanphams = await fdModel.find();

//   console.log(sanphams);

//   res.send(sanphams);
// });

// app.post("/add_sp", async (req, res) => {
//   await mongoose.connect(uri);

//   // let sanpham = {
//   //     ten: 'Sanpham 4',
//   //     gia: 500,
//   //     soluong: 10,
//   //     tonkho: false
//   // }

//   let sanpham = req.body;

//   let kq = await fdModel.create(sanpham);

//   console.log(kq);

//   let sanphams = await fdModel.find();

//   res.send(sanphams);
// });

// app.get("/xoa/:id", async (req, res) => {
//   await mongoose.connect(uri);

//   let id = req.params.id;
//   let kq = await fdModel.deleteOne({ _id: id });

//   console.log(kq);

//   res.redirect("../");
// });

// app.get("/update/:id", async (req, res) => {
//   await mongoose.connect(uri);

//   console.log("Ket noi DB thanh cong");

//   let id = req.params.id;

//   let tenSPMoi = "San pham phien ban moi 2024";

//   await fdModel.updateOne({ _id: id }, { ten: tenSPMoi });

//   let sanphams = await spModel.find({});

//   res.send(sanphams);
// });

// module.exports = app;
// exports.uri = uri;
// exports.mongoose = mongoose;
// exports.fdModel = fdModel;



