const express = require('express');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@cluster0.jcetqj6.mongodb.net/ASM'

const app = express();
const spModel = require('./sanphamModel');
app.use(express.json());

// day danh sach len
app.listen(3000, () => {
    console.log("Server chay cong 3000");
})
mongoose.connect(uri).then(() => console.log("Connect thanh cong"))

app.get('/list', async (req, res) => {
    let sanphams = await spModel.find();
    console.log(sanphams);
    res.send(sanphams)
})

app.post('/list/add', async (req, res) => {
    try {
        const spdata = req.body; // lay du lieu fruit tu yeu cau body
        const newSP = await spModel.create(spdata);
        console.log(newSP);
        const sanphams = await spModel.find();
        res.send(sanphams)
    } catch (error) {
        res.status(500).send(error);
    }
})
app.put('/list/:id', async (req, res) => {
    try {
        const sanphams = await spModel.findById(req.params.id);
        await sanphams.updateOne({ '$set': req.body });
        res.status(200).json("Sua thanh cong")
    } catch (error) {
        res.status(500).json(err)
    }
})
app.delete('/list/:id', async (req, res) => {
    try {
        const spId = req.params.id;
        console.log(spId);
        const deleteSP = await spModel.findByIdAndDelete(spId);
        await deleteSP.deleteOne({ '$set': req.body });
        res.status(200).json("Xoa thanh cong")
    } catch (error) {
        res.status(500).json(err)
    }
})

// upload anh
const upload = require('./upload');
app.post("/addImage", upload.array("image", 5), async (req, res) => {
    try {

        const data = req.body;
        const files = req.files;
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        const newFruit = new FruitModel({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImage,
            description: data.description,
            id_distributor: data.id_distributor,
        })
        const result = await newFruit.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Them that bai",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
