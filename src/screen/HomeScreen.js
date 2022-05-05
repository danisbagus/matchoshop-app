import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { getListProduct } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = Number(match.params.pageNumber) || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct(false, keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, meta } = productList;

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      <h3>Latest Products</h3>
      {loading && <Loader />}
      {!loading && error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <>
            {products.map((item) => (
              <Col
                className="mt-4"
                key={item.product_id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product data={item}></Product>
              </Col>
            ))}
            <div className="mt-5">
              <Paginate
                pages={meta.last_page || 1}
                page={meta.current_page || 1}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
