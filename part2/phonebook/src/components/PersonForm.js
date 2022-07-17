import React from 'react'

const PersonForm = (props) => {
  return (
    <span>{props.text}: <input onChange={props.func}/><br/></span>
  )
}

export default PersonForm