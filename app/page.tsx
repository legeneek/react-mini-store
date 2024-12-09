"use client";

import { createStore } from "@/lib/store";
import { useState } from "react";

const useStore: any = createStore({ count: 1, name: "x" });

export default function Home() {
  const [show, setShow] = useState(true);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 items-center">
        {show && <CompA />}
        <CompC />
      </div>
      <div className="flex gap-2 items-center">
        <CompB />
        <CompD />
      </div>
      <div>
        <button
          className="border p-2 rounded-md"
          onClick={() => {
            setShow(!show);
          }}
        >
          toggle
        </button>
      </div>
    </div>
  );
}

function CompA() {
  console.log("render count");
  const count = useStore.get("count");
  return <div>{count}</div>;
}

function CompB() {
  console.log("render name");
  const name = useStore.get("name");
  return <div>{name}</div>;
}

function CompC() {
  console.log("render button");
  const setCount = useStore.set("count");
  return (
    <button
      className="border p-2 rounded-md"
      onClick={() => setCount((pre: any) => pre + 1)}
    >
      add
    </button>
  );
}

function CompD() {
  console.log("render input");
  const setName = useStore.set("name");
  return (
    <input className="border" onInput={(e: any) => setName(e.target.value)} />
  );
}
