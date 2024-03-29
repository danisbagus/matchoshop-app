import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Form,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (id) => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <Message variant="secondary">
            <Link className="text-dark" to="/">
              Go back
            </Link>
            <span className="mx-2">Your card is empty</span>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.prouduct}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link className="text-dark" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>
              Rp
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  type="button"
                  disable={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
