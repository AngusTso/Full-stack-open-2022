import React from 'react'

const Language = (props) => {
    return (
        <ul>
            {Object.values(props.languages).map(language => <li key={language}><h2>{language}</h2></li>)}
        </ul>
        )
}
export default Language