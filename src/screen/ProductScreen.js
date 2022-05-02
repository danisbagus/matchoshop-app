import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getDetailProduct } from "../actions/productActions";

const defaultImage =
  "https://res.cloudinary.com/matchoshop/image/upload/v1651389301/matchoshop/default-image_oj7t5b.png";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getDetailProduct(match.params.id));
  }, [match, dispatch]);

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const isAdmin = () => {
    if (!userInfo) {
      return false;
    }
    return userInfo.role_id === 1 || userInfo.role_id === 2;
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading && <Loader />}
      {!loading && error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product.image || defaultImage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultImage;
              }}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numb_reviews} reviews`}
                ></Rating>
              </ListGroup.Item>

              <ListGroup.Item>Rp{product.price}</ListGroup.Item>

              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rp{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    {product.stock > 0 && !isAdmin() && (
                      <>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            disabled={isAdmin()}
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </>
                    )}
                    {(product.stock == 0 || isAdmin()) && (
                      <>
                        <Col>Stock</Col>
                        <Col> {product.stock}</Col>
                      </>
                    )}
                  </Row>
                </ListGroup.Item>

                {product.stock > 0 && !isAdmin() && (
                  <ListGroup.Item className="text-center">
                    <div className="d-grid gap-2">
                      <Button
                        onClick={addToCartHandler}
                        type="button"
                        disabled={product.stock < 0}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
