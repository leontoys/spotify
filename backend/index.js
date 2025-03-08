const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

//app.get('/api/token',async (req,res)=>{
const getAccessToken = async()=>{
    const clientId = process.env.CLIENT_ID 
    const clientSecret = process.env.CLIENT_SECRET

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });  
    
    const data = await response.json()
    res.send(data.access_token)
}

app.get('/api/query/:query', async (req,res)=>{
    const token = await getAccessToken()
    console.log("token",token)
})

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
})