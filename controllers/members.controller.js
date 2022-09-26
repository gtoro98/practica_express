const con = require('../db.config')

exports.getMembers = (req, res) =>{
    const sql = 'SELECT * FROM practica_express.members LIMIT 10';

    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
    })
    //console.log("Entro a controler")
    //res.json(members)
}

exports.getMembersById = (req, res) =>{
    const sql = `SELECT * FROM practica_express.members WHERE id = ${req.params.id}`;

    con.query(sql, function (err, result) {
    if (err) throw err;
    if(result.length == 0){
        //res.writeHead(500)
        res.status(400).send('<h1>No member found with that id</h1>')
    }
    else{
        console.log("Result: " + result);

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))
    }
    })
    //console.log(`req id: ${req.params.id}`)
    //res.json(members)
}

exports.createMember = (req, res) =>{
    
    const sql = `INSERT INTO practica_express.members (id, name, email, status) VALUES (${req.body.id}, '${req.body.name}', '${req.body.email}', '${req.body.status}')`;

    con.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("Result: " + JSON.stringify(result));

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
    })
    //console.log(`req id: ${req.params.id}`)
    //res.json(members)
}

exports.deleteMember = (req, res) =>{
    
    const sql = `DELETE FROM practica_express.members WHERE id = ${req.params.id}`;

    con.query(sql, function (err, result) {
    if (err) res.status(400).send('<h1>No member found with that id</h1>');
    if(result.affectedRows === 0){
        res.status(400).send('<h1>No member found with that id</h1>')
    }
    else{
        console.log("Result: " + JSON.stringify(result));

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))
    }

    })
    //console.log(`req id: ${req.params.id}`)
    //res.json(members)
}

exports.updateMember = (req, res) =>{
    let sql = `UPDATE practica_express.members SET`;

    if(typeof req.body.name !== 'undefined' && req.body.name !== null){
        sql = sql.concat(` name = '${req.body.name}'`)
    }
    if(typeof req.body.email !== 'undefined' && req.body.email !== null){
        sql = sql.concat(` email = ${req.body.email}`)
    }
    if(typeof req.body.status !== 'undefined' && req.body.status !== null){
        sql = sql.concat(` status = ${req.body.status}`)
    }
    sql = sql.concat(` WHERE id = ${req.params.id}`)
    console.log(sql)
    con.query(sql, function (err, result) {
    if (err) throw err;
    if(result.affectedRows === 0){
        //res.writeHead(500)
        res.status(400).send('<h1>No member found with that id</h1>')
    }
    else{
        console.log("Result: " + result);

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))
    }
    })
    //console.log(`req id: ${req.params.id}`)
    //res.json(members)
}