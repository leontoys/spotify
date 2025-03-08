const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
//json parser for POST from client
app.use(express.json())
app.use(express.static('dist'))//serve front end 

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
    return data.access_token
}

app.get('/api/search/:query', async (req,res)=>{
    try {
        
        const query = req.params.query
        const accessToken = await getAccessToken()
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
          {
            headers : {
              Authorization : `Bearer ${accessToken}`
            }
          }
          )

       const data = await response.json()
       res.send(data.tracks.items)
        
    } catch (error) {
        console.error(error)
        res.status(500).send(error) //server error
    }
})

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
})