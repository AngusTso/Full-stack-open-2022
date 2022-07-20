import React from 'react'
import FilterResult from './FilterResult'

const Filter = (props) => {
  return (
    <div>
        {props.results.map(result => <span key={result.ccn3}><FilterResult  name={result.name}/><button onClick={() => props.func(result)}>Show detail</button><br/></span>)}
        
    </div>
  )
}

export default Filter