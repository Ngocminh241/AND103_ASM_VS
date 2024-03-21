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
// Thêm sản phẩm
router.post('/add-list', async (req, res) => {
    try {
      const { image,
        name,
        price,
        quantity,
        describe} = req.body;
  
      // Tạo một instance mới của model sản phẩm
      const newSanPham = new server.fdModel({
        image,
        name,
        price,
        quantity,
        describe
      });
  
      // Lưu sản phẩm mới vào cơ sở dữ liệu
      const savedSanPham = await newSanPham.save();
  
      res.status(201).json(savedSanPham); // Trả về sản phẩm vừa được tạo thành công
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });