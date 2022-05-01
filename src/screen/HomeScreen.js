import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getListProduct } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <h1>Latest Products</h1>
      {loading && <Loader />}
      {!loading && error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
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
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
