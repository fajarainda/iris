var express = require('express');
var router = express.Router();
var database = require('../config/database')

/* GET users listing. */
router.get('/list', function(req, res, next) {
  database.query(
    `select * from tb_village`,
    (err,row,field) => {
      if(err) throw err
      else res.send(row)
    }
  )

});

router.get('/detail', function(req, res, next){
  var description = req.body.description
  database.query(
    `select * from tb_village where description like '%${description}'`,
    (err,row,field) => {
      if(err) throw err
      else res.send(row)
    }
  )
})

router.delete('/delete', function(req, res){
  var idtb_village = req.body.idtb_village
  database.query(
    `delete from tb_village where idtb_village like '%${idtb_village}'`,
    (err,row,field) => {
      if (err) throw err
      else res.send("Deleted")
    }
  )
})

router.post('/create', function(req, res){
  let requestBody = req.body
  let sqlQuery = `insert into tb_village
  (name, description, created_at)
  values (
    "${requestBody.name}",
    "${requestBody.description}",
    "${requestBody.created_at}"
  )`

  database.query(
    sqlQuery,
    (err,row,field) => {
      if(err) throw err
      else res.send("Data Inserted")
    }
  )

})

module.exports = router;
