const Course = ({ course }) => {
  

  return(<>
    <Header course={course}/>
    <Content course={course}/>
  </>
  )
}


const Header = ({course}) => <h1>{course.name}</h1>

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

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App