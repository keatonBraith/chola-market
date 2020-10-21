import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Searchbar from "../searchbar/SearchBar";
import { connect } from "react-redux";
import Stars from "../stars/Stars";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/recent").then((res) => {
      setReviews(res.data.slice(0, 15));
    });
    getRandomProducts();
  }, []);

  const getRandomProducts = () => {
    setLoading(true);
    axios.get("/api/products").then((res) => {
      setProducts(
        res.data
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          .slice(0, 4)
      );
      setLoading(false);
    });
  };

  const reviewsFilt = reviews.filter(
    (rev, ind, self) =>
      ind === self.findIndex((t) => t.product_id === rev.product_id)
  );

  if (loading === true) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="home-main">
      <header className="home-header">
        <div className="home-cont">
          <div className="home-img"></div>
          <Searchbar className="home-search" />
        </div>
      </header>
      <div className="home-body">
        <ul className="products-body">
          {products.map((prod, index) => {
            return (
              <Link to={`/product/${prod.product_id}`}>
                <div className="product">
                  <div className="title-box">
                    <h3>{prod.title}</h3>
                  </div>
                  <div>
                    <img src={prod.photo} className="prod-img" />
                    <div>{prod.description}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </ul>
        <div>
          <h3>Recent Reviews</h3>
          <ul>
            {reviewsFilt.map((review, index) => {
              return (
                <Link to={`/product/${review.product_id}`}>
                  <div>
                    {console.log(review)}
                    <div>
                      <img src={review.photo} />
                      <Stars {...review} />
                      <h6>{review.title}</h6>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
