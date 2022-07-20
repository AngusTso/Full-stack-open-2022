import React from 'react'
import Language from './Language'
const OneResult = (props) => {
  const country = props.result[0]
  return (
    <div>
    <p>Name: {country.name.common}</p>
    <p>Capital: {country.capital}</p>
    <p>area: {country.area}</p>
    <h1>Language:</h1>
    <Language languages={country.languages}/>
    <img src={country.flags.png} alt="Country Flag"></img>
    </div>
  )
}

export default OneResult