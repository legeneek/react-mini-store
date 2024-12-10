# react-mini-store

[Combining a reducer with context](https://react.dev/learn/scaling-up-with-reducer-and-context) is an officially recommended approach for state management. But you find the use of context not very user-friendly. It needs to be provided in the form of a component and the wrapping scope must be considered. It also doesn't support fine-grained state reactivity. You start looking for suitable state management libraries, such as zustand, redux, signals...

Why bother integrating these libraries, try to understand the new design paradigm, and introducing lengthy boilerplate code, when you only use a small part of their implemented functionality?

How about implementing it yourself? It takes less than 60 lines of code, and you know exactly what it does.

Take a look at the implementation in lib/store.ts and see if it can help you.

## usage

You can create a store anywhere outside of components. Pass in the initial state object.

```javascript
export const store = createStore({ count: 1 });
```

Import this store and use the `get` method to retrieve the state you need. It uses hooks for implementation, so you need to follow the usage restrictions of hooks.

```jsx
const count = store.get("count");
return <div>{count}</div>;
```

Use the `set` method to update the state, which will also trigger the components using that state to re-render.

```jsx
const setCount = store.set("count");
return <button onClick={() => setCount((pre) => pre + 1)}>add</button>;
```

It does not support reactivity for nested object currently.
