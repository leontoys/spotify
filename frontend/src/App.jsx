import { useState } from 'react'
import './App.css'
import List from './components/List'
import SearchForm from "./components/SearchForm";
import axios from 'axios';

function App() {

  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(false)

  const onSearch = async(query)=>{

    if(!query){
      setResults([])
      return
    }

    setLoading(true)
    //query spotify
    try {

      const response = await axios.get(`http://localhost:3001/api/search/${query}`)

      setResults(response.data)

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
