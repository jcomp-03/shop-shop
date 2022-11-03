import React, { useEffect } from "react";
// import the predefined actions that'll cause reducers to run
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

import { useQuery } from "@apollo/client";
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";


function ProductList() {
  // we immediately execute the useStoreContext() function
  // to retrieve the current global state object and the
  // dispatch method to update its state
  const [state, dispatch] = useStoreContext();
  // we then destructure the currentCategory data out of
  // the state object so we can use it in the filterProducts()
  // function further down
  const { currentCategory } = state;
  // query database for initial product data using Apollo
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  // once the useQuery returns data, execute the dispatch
  // function, instructing reducer function it's the
  // UPDATE_PRODUCTS action and that it should save the array
  // of product data to our global store
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
