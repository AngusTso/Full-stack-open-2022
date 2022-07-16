import { useState } from 'react'

const StatisticLine = (props) => {
    return (
        <tr>
            
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}
const Stat = (props) => {
    const all = props.stat.reduce((acc,cur) => acc += cur)
    const avg = ((props.stat[0] * 1) + (props.stat[2] * -1)) / all
    const positive = (props.stat[0]/all) *100
    if(all)
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                <StatisticLine text="good" value ={props.stat[0]} />
                <StatisticLine text="neutral" value ={props.stat[1]} />
                <StatisticLine text="bad" value ={props.stat[2]} />
                <StatisticLine text="all" value ={all} />
                <StatisticLine text="average" value ={avg} />
                <StatisticLine text="positive" value ={positive + "%"} />
                </tbody>
            </table>
        </div>
    )
    return (
        <div>
            <p>No feedback given</p>
        </div>
    )
}
const Button = (props) => {
    return (
            <button onClick={props.func}> {props.text} </button>
        
    )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const stat = [good , neutral, bad]
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button func={() => setGood(good + 1)} text="Good"/>
      <Button func={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button func={() => setBad(bad + 1)} text="Bad"/>
      <Stat stat={stat}/>
    </div>
  )
}

export default App
