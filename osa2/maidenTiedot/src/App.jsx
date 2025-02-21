import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Search = ({value, onChange}) =>{
  return(
    <form>
      find countries: <input value ={value} onChange={onChange}></input>
    </form>
  )
}

const Countries = ({showing, names, countries, handleClick} ) =>{
  

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
        {names.map(name => {
          const curCountry = countries.find(c => c.name.common === name)
          return( <li key={name}>{name} <button onClick={() => handleClick(curCountry)}>show</button></li>)
        })}
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

  //Tehään kieli objectista array jotta voidaan mapata
  const lan = []
  Object.keys(country.languages).forEach( key => {
    lan.push(country.languages[key])
  }
  )
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
      <Weather country={country}/>
    </div>
  )

}

const Weather = ({country}) => {

  const city = country.capital
  const limit = 1
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [weather, setWeather] = useState(null)
  const [iconId, setIcon] = useState(null)

  useEffect(() =>{
    const cResponse = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${api_key}`)
    const coordsData = cResponse.then(response => response.data)
    coordsData.then(result => {
      setLat(result[0].lat)
      setLon(result[0].lon)
    }) 
  }, [city])

  useEffect(() =>{
    if(lat && lon){
      const wResponse = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      const weatherData = wResponse.then(response => response.data)
      weatherData.then(result => {
        setWeather(result)
        setIcon(result.weather[0].icon)
      })
    }
    
  }, [lat, lon])
  console.log(iconId, 'haha')

  
  if(lat && lon && weather){
    return(
      <div>
        <h1>Weather in {city}</h1>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}></img>
        <p>Wind speed {weather.wind.speed}</p>
      </div>
    )
  }
  return 
}

function App() {
  const[value, setValue] = useState('')
  const[countries, setCountries] = useState([])
  const[names, setNames] = useState([])
  const[namesToShow, setNamesToShow] = useState([])
  const[showing, setShowing] = useState(3)
  const[showOne, setShowOne] = useState(false)
  const[countryToShow, seCountryToShow] = useState(null)



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
    setShowOne(false)
    

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

  const handleClick = (country) => {
    seCountryToShow(country)
    setShowOne(true)
  }

  if(showOne){
    return(
      <div>
        <Search value={value} onChange={handleChange}/>
        <Country country={countryToShow}/>
      </div>
    )
  }

  return (
    <div>
      <Search value={value} onChange={handleChange}/>
      <Countries showing={showing} names={namesToShow}
         countries={countries} handleClick={handleClick}/>
    </div>
  )
}

export default App
