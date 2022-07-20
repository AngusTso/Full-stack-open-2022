import React from 'react'

const Person = (props) => {
  return (
        <span key={props.person.name}>{props.person.name} {props.person.number}
          <button key={props.person.name} onClick={props.func}>Delete</button><br/>
        </span>
  )
}

export default Person