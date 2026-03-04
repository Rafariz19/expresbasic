var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next) {
    connection.query('select * from kategori order by id_kategori desc', function(err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            res.render('kategori/index', {
              title: 'Data Kategori',
                data: rows
            });
        }
    });
});


// GET create kategori
router.get('/create', function(req, res, next) {
  res.render('kategori/create', {
    title: 'Tambah Kategori',
    nama_kategori: ''
  })
});

// POST store kategori
router.post('/store', function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategori
    };

    connection.query(
      'INSERT INTO kategori SET ?', Data, function (err, result) {
        if (err) {
          req.flash('error', 'Gagal menyimpan data!');
        } else {
          req.flash('success', 'Berhasil menyimpan data!');
        }
        res.redirect('/kategori');
      }
    );
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/kategori');
  }
});

module.exports = router;