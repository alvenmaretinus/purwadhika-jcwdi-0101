'use client';

import { useReducer, createContext, useContext, Dispatch } from 'react';
import { reducer, CountActionType, CountAction } from '../../reducers/countReducer';

// Define the state shape
type CountState = {
  count: number;
};

// Define the context type
type LearnReducerContextType = {
  state: CountState;
  dispatch: Dispatch<CountAction>;
};

// Create the context with default undefined
const LearnReducerContext = createContext<LearnReducerContextType | undefined>(undefined);

// Component that consumes the context
function ComponentA() {
  const context = useContext(LearnReducerContext);
  if (!context) {
    throw new Error('ComponentA must be used within a LearnReducerContext Provider');
  }

  const { state, dispatch } = context;

  return (
    <>
      <div>current state is {state.count}</div>
      <button onClick={() => dispatch({ type: CountActionType.DECREMENT, payload: 10 })}>
        decrement by 10
      </button>
    </>
  );
}

// Page component with context provider
export default function LearnReducerPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const incrementBy2 = () => {
    dispatch({ type: CountActionType.INCREMENT, payload: 2 });
  };

  const decrementBy2 = () => {
    dispatch({ type: CountActionType.DECREMENT, payload: 2 });
  };

  return (
    <LearnReducerContext.Provider value={{ state, dispatch }}>
      <h1>Learn Reducer</h1>
      <h3>current count: {state.count}</h3>
      <button onClick={incrementBy2}>increment by 2</button>
      <button onClick={decrementBy2}>decrement by 2</button>
      <hr />
      <ComponentA />
    </LearnReducerContext.Provider>
  );
}
