import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({value, onChange}) =>{
  return(
    <form>
      find countries: <input value ={value} onChange={onChange}></input>
    </form>
  )
}

function App() {
  const [value, setValue] = useState('')
  const[nimet, setNimet] = useState([])
  
  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    const countries = request.then(response => response.data)
    countries.then( result => setNimet(result.map(r => r.name.common)))
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(nimet)
  }

  return (
    <div>
      <Search value={value} onChange={handleChange}/>
    </div>
  )
}

export default App
