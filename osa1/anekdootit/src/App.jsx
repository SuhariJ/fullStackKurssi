import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text} </button>
)

const Header = ({header}) => <h1>{header}</h1>

const Anecdote = ({style, anecdote, votes}) => {
  return(
    <>
      <p style={style}>{anecdote}</p>
      <p style={style}>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const textSize = {
    fontSize: "22px"
  }
  

  //Hoitaa next nappulan toiminnan
  const handleNext = () =>{
    let rndIndex = Math.floor(Math.random()* anecdotes.length)
    setSelected(rndIndex)
  }

  //Hoitaa vote nappulan toiminnan
  const handleVote = () => {
    //Kopioidaan votes taulukko ja annetaan uusi tila kopiotaulukolla
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    //Etsitään eniten ääniä saaneen anekdootin indeksi ja muutetaan tilaa
    const bigI = MostVoted(copy)
    setMostVoted(bigI)
  }

  //Käy läpi taulukon ja palauttaa isoimman luvun indeksin
  const MostVoted = (t) => {
      let maxIndex = 0
      for(let i = 1; i < t.length; i++){
        if(t[i] > t[maxIndex]) maxIndex = i
      }
      return maxIndex
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote style={textSize} anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anectode" />
      <Header header="Anecdote with most votes" />
      <Anecdote style={textSize} anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
    </div>
  )
}

export default App