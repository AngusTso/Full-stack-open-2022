import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import OneResult from './components/OneResult'
import WeatherResult from './components/WeatherResult'
import axios from 'axios'
let flag
const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ResultToShow, setNewShow] = useState([])
  const [countries, setcountries] = useState([])
  const [WeatherData,setWeather] = useState([])
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        const countriesData = response.data
        setcountries(countriesData)
      });
  }, [])

  useEffect(() =>{
    if(ResultToShow.length === 1 && flag){
      const lat = ResultToShow[0].capitalInfo.latlng[0]
      const lon = ResultToShow[0].capitalInfo.latlng[1]
      console.log("reading")
      flag = false
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
          setWeather([response.data])
          console.log(WeatherData)
          //console.log(WeatherData.main.temp , WeatherData.weather[0])
        }
      )
    }
    return
  })
  //Use Regexp to search result for both first and last name
  function handleFilter(event) {
    let result
    //if the input field isnt empty we do the filter otherwise set the result to show back to empty (Avoid showing unnecessary results)
    if (event.target.value) {
      //regular experssion for insentitive search
      const regexp = new RegExp(event.target.value, "gi")
      result = countries.filter(country => country.name.common.match(regexp))
      if (result.length < 1) result = []
      setNewShow(result)
    }
    else {
      result = []
      setNewShow(result)
    }
    flag = true;
    return
  }
  function detailHandler(result){
    const one = [result];
    setNewShow(one)
  }

  if (ResultToShow.length <= 10 && ResultToShow.length > 1) {
    return (
      <div>
        <h2>Search country</h2>
        <p>Type to search country</p>
        <input onChange={handleFilter}></input>
        <Filter results={ResultToShow} func={detailHandler} />
      </div>
    )
  }
  else if (ResultToShow.length === 1) {
    return (
      <div>
        <h2>Search country</h2>
        <p>Type to search country</p>
        <input onChange={handleFilter}></input>
        <OneResult result={ResultToShow} />
        <WeatherResult weather={WeatherData} capital={ResultToShow[0].capital}/>
      </div>
    )
  }
  else if (ResultToShow.length === 0){
    return(
      <div>
        <h2>Search country</h2>
        <p>Type to search country</p>
        <input onChange={handleFilter}></input>
        <p>No Result</p>
      </div>
    )
    
  }
  else {
    return (
      <div>
        <h2>Search country</h2>
        <p>Type to search country</p>
        <input onChange={handleFilter}></input>
        <p>Too Many Result , please be more specific</p>
      </div>
    )
  }

}

export default App