// createContext instantiates a new Context object
// It creates the container which will hold our global state
// useContext is another hook which allows us to use
// the state created from createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const StoreContext = createContext();
// Every Context object comes with two components, a Provider
// and a Consumer. We wrap our entire application in the Provider
// component so that children components have access to the global
// state data. The Consumer is the means of grabbing and using the
// data that the Provider holds for us.
const { Provider } = StoreContext;

// we instantiate our initial global state here
// what we did here was create our own functionality to manage state at
// a global level and make it available to all of our other components
// through a special <Provider> component
const StoreProvider = ({ value = [], ...props }) => {
  // the useProductReducer function will return us two items
  // state, or the most up-to-date version of our global state object
  // and dispatch, the method we execute to update our state (will look for an action object)
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });
  // use this to confirm it works!
  console.log(state);
  // we return the Provider component with the new state and function
  // to update state
  return <Provider value={[state, dispatch]} {...props} />;
};

// When we execute this function from 
// within a component, we will receive the 
// [state, dispatch] data our StoreProvider provider
// manages for us
const useStoreContext = () => {
  return useContext(StoreContext);
};


export { StoreProvider, useStoreContext };