const Course = ({ course }) => {
    return(<>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
    )
  }
  
  
  const Header = ({course}) => <h2>{course.name}</h2>
  
  const Content = ({course}) => (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
  
  const Part = ({name, exercises}) => (
    <p>{name} {exercises}</p>
  )
  
  const Total = ({course}) => {
    
    const total = 
      course.parts.reduce(
        (lisaaja, part) => part.exercises + lisaaja
      , 0)
  
    return(
      <b>Number of exercises {total}</b>
    )
  }

  export default Course