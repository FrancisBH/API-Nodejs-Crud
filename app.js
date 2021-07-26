const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeAPI'
});

//Route
app.get('/', (req, res) => {
    res.send('Welcome New to my API! 2');
});

//all customers
app.get('/customers', (req, res) => {
    const sql = 'Select * From customers';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

app.get('/customers/:id', (req, res) => {
    const {id} = req.params
    const sql = `Select * From customers Where id = ${id}`;
    
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

app.post('/add', (req, res) => {
    const sql = 'Insert into customers SET ?';

    const customerObj = {
        name: req.body.name,
        city: req.body.city
    }
    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Customer created!');
    });

});

app.put('/update/:id', (req, res) => {
    const {id} = req.params
    const {name, city} = req.body;
    const sql = `Update customers SET name = '${name}', city = '${city}' Where id = ${id}`;
    
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Customer Updated!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    const sql = `Delete From customers Where id = ${id}`;
  
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete customer');
    });
});


//Check Connect

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Serer running on port ${PORT}`));