const mysql = require('mysql')

const database = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'@bismillah1234',
    database:'db_iris'
});

database.connect((err) => {
    if(err){
        console.log('Error Connecting to db')
        console.log(err)
        return;
    }
    console.log('Connection Established')
})

module.exports = database