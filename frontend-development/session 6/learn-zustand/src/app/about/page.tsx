"use client"

import { useCounterStore } from "@/stores/counterStore";

export default function AboutPage() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div>
      <h2 className="text-amber-300">{count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}
