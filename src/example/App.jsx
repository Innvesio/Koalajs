import React from "react";
import { createState } from "../state/createContextState";
import { combineProviders } from "../state";

const initialState = { count: 0 };
const actions = {
  increment: (state) => ({ count: state.count + 1 }),
  decrement: (state) => ({ count: state.count - 1 }),
};

const [CounterProvider, useCounterContext] = createState({
  state: initialState,
  actions,
});

const Counter = () => {
  const { state, actions } = useCounterContext();

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={actions.increment}>Increase</button>
      <button onClick={actions.decrement}>Decrese</button>
    </div>
  );
};

export const App = () => {
  const AppProvider = combineProviders([CounterProvider]);
  return (
    <AppProvider>
      <Counter />
    </AppProvider>
  );
};
