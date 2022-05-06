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
import Meta from "../components/Meta";
import {
  getDetailProduct,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const defaultImage =
  "https://res.cloudinary.com/matchoshop/image/upload/v1651389301/matchoshop/default-image_oj7t5b.png";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(getDetailProduct(false, match.params.id));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  }, [match, dispatch, successProductReview]);

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

  const isReviewed = () => {
    let reviewed = false;

    if (!userInfo || !product || product.reviews.length === 0) {
      return false;
    }

    product.reviews.map((review) => {
      if (review.user_id === userInfo.user_id) {
        reviewed = true;
      }
    });
    return reviewed;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview({
        product_id: Number(match.params.id),
        rating: Number(rating),
        comment,
      })
    );
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
        <>
          <Meta title={product.name} />
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
                      <Col>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
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
                      {(product.stock === 0 || isAdmin()) && (
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
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {(!product.reviews || product.reviews.length === 0) && (
                <Message variant="secondary">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review.review_id}>
                      <strong>{review.user_name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.created_at.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  {userInfo && !isAdmin() && !isReviewed() && (
                    <>
                      <h4>Add Review</h4>
                      {successProductReview && (
                        <Message variant="success">
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}

                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          className="mt-3"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    </>
                  )}
                  {!userInfo && (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
