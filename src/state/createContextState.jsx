import React, { createContext, useContext, useReducer } from "react";

/**
 * Creates a null-safe context and state management system.
 * @param {Object} params - The initial state and actions.
 * @param {Object} params.state - The initial state.
 * @param {Object} params.actions - The actions object.
 * @returns {Array} - The [Provider, useStateContext] pair.
 */
export const createState = ({ state = {}, actions = {} }) => {
  // Ensure actions is an object and has at least one function
  if (typeof actions !== "object" || actions === null) {
    throw new Error("Actions must be an object");
  }

  const Context = createContext();

  // Reducer function with null-safe checks
  const reducer = (state, action) => {
    const actionFn = actions[action?.type];
    if (typeof actionFn === "function") {
      return actionFn(state, ...(action.payload || []));
    }
    return state; // Return the current state if no action handler is found
  };

  // Provider component
  const Provider = ({ children }) => {
    const [contextState, dispatch] = useReducer(reducer, state);

    // Bound actions with null-safety for payload
    const boundActions = React.useMemo(() => {
      return Object.keys(actions).reduce((acc, type) => {
        acc[type] = (...payload) => dispatch({ type, payload });
        return acc;
      }, {});
    }, [actions]);

    return (
      <Context.Provider value={{ state: contextState, actions: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // Custom hook to access state and actions with null-safety
  const useStateContext = () => {
    const context = useContext(Context);

    if (!context) {
      throw new Error("useStateContext must be used within its Provider");
    }

    const { state, actions } = context;

    // Ensure both state and actions are not null or undefined
    if (state === null || state === undefined) {
      throw new Error("State cannot be null or undefined");
    }

    if (actions === null || actions === undefined) {
      throw new Error("Actions cannot be null or undefined");
    }

    return context;
  };

  return [Provider, useStateContext];
};
