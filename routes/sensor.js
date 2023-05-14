var express = require('express');
var router = express.Router();
var database = require('../config/database');

router.get ('/list', function (req,res) {
    database.query(
        `select * from tb_sensor`,
        (err,row,field) => {
            if(err) throw err
            else res.send(row)
        }
    )
})

router.get ('/detail', function (req,res) {
    var status = req.body.status
    database.query(
        `select * from tb_sensor where status like '%${status}'`,
        (err,row,field) => {
            if(err) throw err
            else res.send(row)
        }
    )
})

router.delete('/delete', function(req, res){
    var idtb_sensor = req.body.idtb_sensor
    database.query(
        `delete from tb_sensor where idtb_sensor like '%${idtb_sensor}'`,
        (err,row,field) => {
        if (err) throw err
        else res.send("Deleted")
        }
    )
})

router.post ('/create', function (req,res) {
    let requestBody = req.body
    let sqlQuery = `insert into tb_sensor (status, created_at, idtb_location)
    values
    (
        "${requestBody.status}",
        "${requestBody.created_at}",
        "${requestBody.idtb_location}"
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