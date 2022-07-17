const Course = ({course}) => {
    console.log(course)
    const sum = course.parts.reduce(((acc,cur) => acc+= cur.exercises),0)
    return(
      <div>
        <h1>{course.name}</h1>
        {course.parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <p>Total of {sum} exercises</p>
      </div>
    )
  }

  export default Course