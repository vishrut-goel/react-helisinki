import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectAnecdode = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }

  const countVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      {votes[selected] > 0 && (
        <p>has {votes[selected]} vote{votes[selected] === 1 ? '' : 's'}</p>
      )}
      <Button handleClick={selectAnecdode} text="next anecdote" />
      <Button handleClick={countVote} text="vote" />
      <Heading text="Anecdote with most votes" />
      {maxVotesIndex !== -1 && votes[maxVotesIndex] > 0 && (
        <>
          <Display text={anecdotes[maxVotesIndex]} />
          <p>has {votes[maxVotesIndex]} vote{votes[maxVotesIndex] === 1 ? '' : 's'}</p>
        </>
      )}
    </div>
  )
}

const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Display = ({ text }) => {
  return (
    <>
      <p>{text}</p>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App