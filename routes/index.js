var express = require('express');
var router = express.Router();
var collection = require('../database/qlsv.js');

var images = [];


//trang chủ
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Trang chủ' });
});


//viewvalue
router.get('/viewdata', async (req, res, next) => {
  res.render('view', { title: 'Danh sách sinh viên' });
});

router.get('/getdata/:page', async (req, res, next) => {
  var page = req.params.page || 1;
  var ValueCount = 5;
  var SkipValue = (ValueCount * page) - ValueCount;
  const data = await collection.find().skip(SkipValue).limit(ValueCount).exec();
  var countData = await collection.find();
  res.send({data:data,countData:countData.length});
});

//uploadImage
router.post('/uploadImage', function (req, res, next) {
  
  const ImageValue = req.files.file;
  if(ImageValue.name.match(/\.(jpg|png|gif|jpeg)$/)){
    ImageValue.mv((`image/${ImageValue.md5}_${ImageValue.name}`));
    var path = `image/${ImageValue.md5}_${ImageValue.name}`;
    images.push(path);
    res.send(req.files);
  }
});

//addvalue
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Thêm sinh viên' });
});

router.post('/addvalue', function (req, res, next) {
  var valueimage = images[images.length - 1];
  const value = {
    msv: req.body.msv,
    fullName: req.body.fullName,
    birthDay: req.body.birthDay,
    addRess: req.body.addRess,
    phoneNumber: req.body.phoneNumber,
    image: valueimage
  }
  const data = new collection(value);
  data.save();
});

//deletevalue
router.post('/delete/:id', async (req, res, next) => {
  var id = req.body.id;
  await collection.findByIdAndDelete({ _id: id }).exec();
});

//editvalue
router.post('/edit/:id', async (req, res, next) => {
  var valueimage = images[images.length - 1];
  var id = req.body.id;
  var dataqlsv = {
    fullName: req.body.fullName,
    birthDay: req.body.birthDay,
    addRess: req.body.addRess,
    phoneNumber: req.body.phoneNumber,
    image: valueimage
  }
  await collection.findByIdAndUpdate(id, dataqlsv);
});


//search
router.post('/search', async (req, res, next) => {
  var searchmsv = String(req.body.msv);
  var searchName = req.body.fullName;
  const data = await collection.find({ $or: [{ msv: searchmsv }, { fullName: { $regex: searchName } }] });
  console.log(data);
  res.send(data);
});

function checkFile(req,res,cb){

}

module.exports = router;
