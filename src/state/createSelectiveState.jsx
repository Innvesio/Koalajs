import React, { createContext, useContext, useReducer } from "react";

export const createSelectiveState = ({ state, actions }) => {
  if (!state || typeof state !== "object") {
    throw new Error("Initial state must be a valid object.");
  }

  if (!actions || typeof actions !== "object") {
    throw new Error("Actions must be a valid object with action handlers.");
  }

  const Context = createContext(null); // Ensure the default value is null.

  const reducer = (currentState, action) => {
    const actionFn = actions[action.type];
    if (!actionFn) {
      console.warn(`Action "${action.type}" is not defined.`);
      return currentState; // Return current state if action is not defined.
    }
    return actionFn(currentState, ...(action.payload || []));
  };

  const Provider = ({ children }) => {
    const [contextState, dispatch] = useReducer(reducer, state);

    const boundActions = Object.keys(actions).reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {});

    const getValue = (selector) => {
      try {
        return selector ? selector(contextState) : contextState;
      } catch (error) {
        console.error("Error in selector function:", error);
        return null; // Return null to avoid breaking the application.
      }
    };

    return (
      <Context.Provider
        value={{ state: contextState, actions: boundActions, getValue }}
      >
        {children}
      </Context.Provider>
    );
  };

  const useSelectiveContext = (selector) => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        "useSelectiveContext must be used within its corresponding Provider."
      );
    }

    const selectedState = selector
      ? context.getValue(selector)
      : context.getValue();
    if (selectedState === null) {
      console.warn("Selector returned null. Check your selector logic.");
    }

    return { state: selectedState, actions: context.actions };
  };

  return [Provider, useSelectiveContext];
};

