import { useEffect, useState } from "react";

export function createStore(target: any) {
  const depMap: any = new Map();

  function setter(key: any, val: any) {
    target[key] = val;
    const dep = depMap[key];
    if (dep) {
      const cbs = dep.values();
      for (const f of cbs) {
        f(val);
      }
    }
  }

  // useStore
  return (key: any) => {
    const [data, setData] = useState<any>(target[key]);

    if (!depMap[key]) {
      depMap[key] = new Set();
    }

    if (!depMap[key].has(setData)) {
      depMap[key].add(setData);
    }

    useEffect(() => {
      return () => {
        depMap[key].delete(setData);
      };
    }, []);

    return {
      data,
      setData: (val: any) => setter(key, val),
    };
  };
}
