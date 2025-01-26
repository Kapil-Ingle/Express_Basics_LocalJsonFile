const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const app =  require('./app')

console.log(process.env);

// CONSTATS VALUES
const port = process.env.PORT || 8080;

// START SERVER
app.listen(port, () => {
    console.log('server has started...');
})