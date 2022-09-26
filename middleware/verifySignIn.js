const con = require('../db.config')

checkDuplicateEmails = (req, res, next) =>{
    const sql = `SELECT * FROM practica_express.users WHERE email = '${req.body.email}'`

    con.query(sql, (err, result) =>{
        console.log("Entro al middleware")
        console.log(sql)
        if (err) throw err
        if(result.length !== 0){
            console.log(result)
            console.log("Email ya se esta usando")
            return res.status(400).send({message: "Email Already in use"})
        }
        else{
            next()
        }
    })
}
const verifySignIn = {
    checkDuplicateEmails: checkDuplicateEmails,
}
module.exports = verifySignIn