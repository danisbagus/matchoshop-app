import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ data }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${data.product_id}`}>
        <Card.Img src={data.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${data.product_id}`}>
          <Card.Title as="div">
            <strong>{data.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={data.rating} text={`${data.numb_reviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">Rp{data.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
