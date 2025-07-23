"use client"

import { useReducer, createContext, useContext } from "react"
import { reducer, CountActionType } from '../../reducers/countReducer'

const LearnReducerContext = createContext({
  state: { count : 0 },
  dispatch: (param: Record<string, any>) => {}
})

function ComponentA() {
  const { state, dispatch } = useContext(LearnReducerContext)

  return (
    <>
      <div>current state is {state.count}</div>
      <button onClick={() => dispatch({ type: CountActionType.DECREMENT, payload: 10 })}>decrement by 10</button>
    </>
  )
}

export default function LearnReducerPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  const incrementBy2 = () => {
    dispatch({ type: CountActionType.INCREMENT, payload: 2 })
  }

  const decrementBy2 = () => {
    dispatch({ type: CountActionType.DECREMENT, payload: 2 })
  }

  return (
    <LearnReducerContext value={{ state, dispatch } as any}>
      <h1>Learn Reducer</h1>
      <h3>current count: {state.count}</h3>
      <button onClick={incrementBy2}>increment by 2</button>
      <button onClick={decrementBy2}>decrement by 2</button>
      <hr />
      <ComponentA />
    </LearnReducerContext>
  )
}
