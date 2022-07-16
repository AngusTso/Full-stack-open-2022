const Header = (props) => {  
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0].name} exercises={props.part[0].exercises}/>
      <Part part={props.part[1].name} exercises={props.part[1].exercises}/>
      <Part part={props.part[2].name} exercises={props.part[2].exercises}/>
    </div>
  )
}
const Total = (props) => {
  const sum = props.part.reduce((acc , cur) => {
    return acc += cur.exercises;
  },0);
  return(
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}


const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />
      <Content part={course.parts}/>
      <Total part={course.parts}/>
    </div>
  )
}

export default App