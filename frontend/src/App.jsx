import { useState } from 'react'
import './App.css'
import List from './components/List'
import SearchForm from "./components/SearchForm";

function App() {

  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(false)

  const getAccessToken = async () => {

    const token = await axios.get(`http://localhost:3001/api/token`)

    return token;
  };

  const onSearch = async(query)=>{

    if(!query){
      setResults([])
      return
    }

    setLoading(true)
    //query spotify
    try {
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
       setResults(data.tracks.items)
       console.log("data",data)   

    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>Spotify Search</h1>
      <SearchForm onSearch={onSearch}></SearchForm>
      {
        loading ? 
        (<p>Loading...</p>) : 
        (<List results={results}></List>)
      }
    </div>
  )
}

export default App
