"use client";

import { createStore } from "@/lib/store";

const useStore = createStore({ count: 1 });

export default function Home() {
  return (
    <div>
      <CompA />
      <CompB />
      <CompC />
    </div>
  );
}

function CompA() {
  console.log("render A");
  const { data: count } = useStore("count");
  return <div>{count}</div>;
}

function CompB() {
  console.log("render B");
  const { data: count } = useStore("count");
  return <div>{count * 2}</div>;
}

function CompC() {
  console.log("render C");
  const { data: count, setData: setCount } = useStore("count");
  return <button onClick={() => setCount(count + 1)}>add</button>;
}
