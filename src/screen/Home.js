import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import products from "../products";

const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
            <Product data={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
