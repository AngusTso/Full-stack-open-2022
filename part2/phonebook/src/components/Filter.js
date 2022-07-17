import React from 'react'
import FilterResult from './FilterResult'

const Filter = (props) => {
  return (
    <div>
        {props.results.map(result => <span key={result.id}><FilterResult  key={result.id} name={result.name}/></span>)}
    </div>
  )
}

export default Filter