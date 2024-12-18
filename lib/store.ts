import { useEffect, useState } from "react";

export function createStore(target: any = {}) {
  const depMap: any = new Map();

  function setter(key: any, val: any) {
    const pre = target[key];
    if (pre === val) {
      // no need to set
    } else {
      target[key] = val;
      const dep = depMap[key];
      if (dep) {
        const cbs = dep.values();
        for (const f of cbs) {
          f(val);
        }
      }
    }
  }

  return {
    get: (key: any) => {
      const [data, setData] = useState<any>(target[key]);
      useEffect(() => {
        return () => {
          depMap[key].delete(setData);
        };
      }, []);

      if (!depMap[key]) {
        depMap[key] = new Set();
      }

      if (!depMap[key].has(setData)) {
        depMap[key].add(setData);
      }
      return data;
    },
    set: (key: any) => {
      return (val: any) => {
        if (typeof val == "function") {
          const v = val(target[key]);
          setter(key, v);
        } else {
          setter(key, val);
        }
      };
    },
  };
}
