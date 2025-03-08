const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
})