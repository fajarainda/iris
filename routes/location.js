var express = require('express');
var router = express.Router();
var database = require('../config/database');

router.get ('/list', function(req,res) {
    database.query(
        `select * from tb_location`,
        (err,row,field) => {
            if(err) throw err
            else res.send(row)
        }
    )
})

router.get ('/detail', function(req,res) {
    var description = req.body.description
    database.query(
        `select * from tb_location where description like '%${description}'`,
        (err,row,field) => {
            if(err) throw err
            else res.send(row)
        }
    )
})

router.delete('/delete', function(req, res){
    var idtb_location = req.body.idtb_location
    database.query(
        `delete from tb_location where idtb_location like '%${idtb_location}'`,
        (err,row,field) => {
        if (err) throw err
        else res.send("Deleted")
        }
    )
})

router.post ('/create', function (req,res) {
    let requestBody = req.body
    let sqlQuery = `insert into tb_location (latitude, longitude, description, created_at, idtb_village)
    values (
        "${requestBody.latitude}",
        "${requestBody.longitude}",
        "${requestBody.description}",
        "${requestBody.created_at}",
        "${requestBody.idtb_village}"
    )`
    database.query(
        sqlQuery,
        (err, row, field) => {
            if(err) throw err
            else res.send("Data Inserted")
        }
    )
})

module.exports = router;