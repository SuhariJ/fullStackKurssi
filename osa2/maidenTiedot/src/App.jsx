import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({value, onChange}) =>{
  return(
    <form>
      find countries: <input value ={value} onChange={onChange}></input>
    </form>
  )
}

const Countries = ({showing, names, countries} ) =>{
  if(showing === 3){
    return (
      <div>
        Too many countries
      </div>
    )
  }
  if(showing === 2){
    return (
      <>
        {names.map(c => <li key={c}>{c}</li>)}
      </>
    )
  }

  const country = countries.find(c => c.name.common === names[0])

  return(
    <>
      <Country country={country}/>
    </>
  )
}

const Country = ({country}) =>{

  const lan = []
  Object.keys(country.languages).forEach( key => {
    lan.push(country.languages[key])
  }
  )
  console.log(lan)

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {lan.map(l => <li key={l}> {l} </li>)}
      </ul>
      <br/>
      <img src={country.flags.png} alt={country.flags.alt} ></img>
    </div>
  )

}

function App() {
  const [value, setValue] = useState('')
  const[countries, setCountries] = useState([])
  const[names, setNames] = useState([])
  const[namesToShow, setNamesToShow] = useState([])
  const[showing, setShowing] = useState(3)

  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    const data = request.then(response => response.data)
    data.then( result => {
      setCountries(result)
      setNames(result.map(r => r.name.common))
    })
  }, [])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    const newNames = names.filter(n => n.toLowerCase().includes(newValue.toLowerCase()))
    setNamesToShow(newNames)

    if(newNames.length > 10) {
      setShowing(3)
      return
    }
    if(newNames.length === 1){
      setShowing(1)
      return
    }
    setShowing(2)

  }

  return (
    <div>
      <Search value={value} onChange={handleChange}/>
      <Countries showing={showing} names={namesToShow} countries={countries}/>
    </div>
  )
}

export default App
