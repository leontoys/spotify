import React,{useState} from "react";

const SearchForm = ({onSearch}) =>{

    const [query,setQuery] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSearch(query)
    }

    return(
        <form className="form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="query"></label>
            <input className="input"
            name="query"
            type="text"
            placeholder="Search for tracks..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            ></input>
            <button className="button" type="submit">Search </button>
        </form>
    )

}

export default SearchForm