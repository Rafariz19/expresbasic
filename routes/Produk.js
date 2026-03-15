var express = require('express');
var router = express.Router();
const connection = require("../config/database.js");
const model_produk = require('../Model/model_produk.js');

router.get('/', async function(req, res, next) {
    let rows = await model_produk.getAll();

    res.render('Produk/index', {
        title: 'Data Produk',
        data: rows
    });
  });
  
  // GET create produk
  router.get('/create', function(req, res, next) {
    res.render('Produk/create', {
      title: 'Tambah Produk',
      nama_produk: '',
      harga: '',
      kategori: ''
    })
});

// Edit Produk
router.get('/edit/(:id)', async function(req, res, next) {
  let id = req.params.id;
  let rows = await  model_produk.getid(id);
        res.render('Produk/edit',{
        id: rows[0].id,
        nama_produk: rows[0].nama_produk,
        harga: rows[0].harga,
        kategori: rows[0].kategori
      })
  })

// Delete produk
router.get('/delete/(:id)', async function(req, res){
  let id = req.params.id;
  await model_produk.delete(id);
  connection.query('delete from produk where id =' + id,function(err){
  if (err) {
    req.flash('error', 'Gagal menghapus data');
  }else{
    req.flash('success','Data terhapus!');
  }
  res.redirect('/produk');
})
});

// POST store produk
router.post('/store', async function (req, res, next) {
  try {
    let { nama_produk, harga, kategori } = req.body;
    let Data = {
      nama_produk,
      harga,
      kategori
    };  

    await model_produk.Store(Data);
    res.redirect('/produk');
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/produk');
  }
});


// POST update produk
router.post('/update/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let {nama_produk, harga, kategori} = req.body;
    let Data = {
      nama_produk,
      harga,
      kategori
    };  

    await model_produk.update(id, Data);
    req.flash('succes', 'Berhasil mengupdate');
    res.redirect('/produk');
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/produk');
  }
});


module.exports = router;