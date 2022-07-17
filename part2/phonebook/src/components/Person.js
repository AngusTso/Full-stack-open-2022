import React from 'react'

const Person = (props) => {
  return (
    <p key={props.person.name}>{props.person.name} {props.person.number}</p>
  )
}

export default Person