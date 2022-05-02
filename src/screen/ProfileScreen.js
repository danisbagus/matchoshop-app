import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetail, updateUserProfile } from "../actions/userAction";
import { listMyOrders } from "../actions/orderActions";

function ProfileScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleID, setRoleID] = useState("");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetail());
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setRoleID(user.role_id);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name }));
  };

  const getRoleName = (roleID) => {
    if (roleID === 1) {
      return "Super Admin";
    } else if (roleID === 2) {
      return "Admin";
    } else if (roleID === 3) {
      return "Customer";
    } else if (roleID === 4) {
      return "Guest";
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h3>User Profile</h3>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{"Profile updated"}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              disabled
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="role_id">
            <Form.Label>Role</Form.Label>
            <Form.Control disabled value={getRoleName(roleID)}></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      {!(userInfo.role_id === 1 || userInfo.role_id === 2) && (
        <Col md={9}>
          <h3>My Orders</h3>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.created_at.substring(0, 10)}</td>
                    <td>{order.total_price}</td>
                    <td>
                      {order.is_paid ? (
                        order.paid_at.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.is_delivered ? (
                        order.deliverd_at.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order.order_id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      )}
    </Row>
  );
}

export default ProfileScreen;
