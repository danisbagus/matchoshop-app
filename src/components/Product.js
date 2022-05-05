import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const defaultImage =
  "https://res.cloudinary.com/matchoshop/image/upload/v1651389301/matchoshop/default-image_oj7t5b.png";

const Product = ({ data }) => {
  return (
    <Card className="px-2 py-4 rounded h-100">
      <Link to={`/product/${data.product_id}`}>
        <div className="container">
          <div class="col-md-12">
            <Card.Img
              src={data.image || defaultImage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultImage;
              }}
              variant="top"
            />
          </div>
        </div>
      </Link>

      <Card.Body>
        <Link className="text-dark" to={`/product/${data.product_id}`}>
          <Card.Title as="div">
            <strong>{data.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={data.rating} text={`${data.numb_reviews} reviews`} />
        </Card.Text>
        <Card.Text as="h4">Rp{data.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
