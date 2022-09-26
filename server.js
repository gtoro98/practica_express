const express = require('express');
const path = require('path');
const  {logger}  = require("./middleware");
const bodyParser = require('body-parser');

const app = express();

app.use(logger.log)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes/general.routes'))
app.use('/api/members', require('./routes/member.routes'))
app.use('/auth', require('./routes/auth.routes'))
//app.use(express.static(path.join(__dirname, 'public')))
//require('./routes/member.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})


