const con = require('../db.config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../auth.config')

exports.signIn = (req, res) => {
    
    const newUser = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    const sql = `INSERT INTO practica_express.users (email, password) 
                VALUES ('${newUser.email}', '${newUser.password}')`
    console.log(sql)
    con.query(sql, function (err, result) {
    if (err) res.status(400).send({ message: err });
    else{
        console.log("Result: " + JSON.stringify(result));

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))
    }
    })
}

exports.logIn = (req, res) => {
    const sql = `SELECT * FROM practica_express.users WHERE email = '${req.body.email}'`
    console.log(sql)
    con.query(sql , function(err, result){
        if(result === 'undefined' || result === null){
            return res.status(404).send({
                accesToken: null,
                message: "No user found!",
            })
        }
        else{
            console.log(result[0].password)
            let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password)

            if(!passwordIsValid){
                return res.status(401).send({
                    accesToken: null,
                    message: "Invalid Password!",
                })
            }
            console.log(config.secret)
            var token = jwt.sign({id: result.user_id}, config.secret, {expiresIn: 86400})

            return res.status(200).send({
                id: result[0].user_id,
                name: result[0].name,
                email: result[0].email,
                accessToken: token
              });
        }
    })
}
exports.info = (req, res) => {
    return res.status(200).send({message: "Estas loggeado en tu cuenta"})
}