import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Donate from "../donate/Donate";

const Home = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Donate & help" />

          <div className="banner">
            <p>Welcome to Dick's Online Portal</p>
            <h1>SPORTS MAKE PEOPLE BETTER</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="searchbar">
            <form className="searchBoxbar" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <h2 className="homeHeading">Donation Requests</h2>
          <Donate />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
