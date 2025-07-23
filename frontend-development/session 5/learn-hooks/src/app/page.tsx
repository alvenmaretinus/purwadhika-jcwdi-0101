"use client"

import { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from "react";
import useCounter from "./hooks/useCounter";

// initialize a context
const TextContext = createContext('');

function ComponentA() {
  return <div>this is component A</div>
}

function ComponentB() {
  return <div>this is component B</div>
}

function ComponentC() {
  return (
    <>
      <ComponentD />
      <div>this is component C</div>
    </>
  )
}

function ComponentD() {
  // use whatever's shared in the context
  const text = useContext(TextContext)

  return <div>this is component D, this is value of `text`: {text}</div>
}

export default function Home() {
  // array destructuring
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>(['apple', 'banana', 'watermelon', 'blueberry'])
  const countRef = useRef<number>(0);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { count: hookCount, increment: hookCountIncrement, decrement: hookCountDecrement } = useCounter(100);

  // will run on first render
  useEffect(() => {
    console.log('page is loaded')
  }, [])

  // will run on every render
  useEffect(() => {
    console.log('Home is updated')
  })

  // tracks state changes (in this case it's `count`)
  useEffect(() => {
    console.log('`count` state is updated')
  }, [count])

  useEffect(() => {
    console.log('`text` state is updated')
  }, [text])

  // returns composite variable from the states that useMemo tracks
  const inputAndCountString = useMemo(() => {
    return `the count is ${count}, the text is ${text}`
  }, [count, text])

  // initialized on first render
  const incrementCount = useCallback(() => {
    setCount((currentCount) => currentCount + 1)
  }, [])

  console.log(inputRef)
  console.log(inputAndCountString)

  return (
    <div>
      <div>
        you have clicked {count} time{count > 1 ? 's' : ''}
      </div>
      <button onClick={incrementCount}>increase count</button>
      <div className="mt-3">
        <div>search fruits</div>
        <input type="text" className="border border-solid border-amber-400" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="py-3">---------------------------------</div>
      {items
        .filter(item => item.toLowerCase().includes(text.toLowerCase()))
        .map(item => <div key={item}>{item}</div>)}

      <div className="py-3">----------- refs ----------</div>

      <div>{countRef.current}</div>
      <button
        onClick={() => {
          countRef.current = countRef.current + 1;
        }}
      >
        update countRef
      </button>

      <input
        ref={inputRef}
        type="text"
        className="border border-solid border-amber-400"
      />

      <br />
      <button 
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = 'input here';
          }
        }}
      >
        update input text
      </button>

      <hr />

      <h2>context</h2>

      <TextContext value={text}>
        {/* anything inside here has access to what's shared within the context */}
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </TextContext>

      <hr />

      {hookCount}
      <button onClick={hookCountIncrement}>increment hook count</button>
      <button onClick={hookCountDecrement}>decrement hook count</button>
    </div>
  );
}
