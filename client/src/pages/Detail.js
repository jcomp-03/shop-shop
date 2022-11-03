import React, { useEffect, useState } from "react";
// import the predefined actions that'll cause reducers to run
import { UPDATE_PRODUCTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";

function Detail() {
  // Here again we execute useStoreContext() function
  // to retrieve the current global state object and the
  // dispatch method to update its state
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  // query database for initial product data using Apollo
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;
 
  useEffect(() => {
    // if there's data in the global state's products array,
    // figure out which product needs to be displayed by
    // setting the current product to the one which matches id
    // value from params
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      // but if there's no product data in global store, use the 
      // product data we returned from the useQuery() hook to set
      // product data to the global store object. When that's complete
      // we'll run through this same useEffect callback function since
      // products has now changed.
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    } // notice how many arguments are in the useEffect's dependency array
  }, [products, data, dispatch, id]); 
                          

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
