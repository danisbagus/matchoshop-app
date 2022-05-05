import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/productActions";
import { getListProductCategory } from "../actions/productCategoryAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState([]);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingProductCategory,
    error: errorProductCategory,
    productCategories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(getListProductCategory());
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      console.log("mundur dong");
      history.push("/admin/productlist");
    }
  }, [dispatch, history, successCreate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/upload/image",
        formData,
        config
      );

      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        sku,
        price,
        image,
        brand,
        product_category_id: category,
        description,
        stock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h3>Create Product</h3>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loadingProductCategory && <Loader />}
        {errorProductCategory && (
          <Message variant="danger">{errorProductCategory}</Message>
        )}
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

          <Form.Group controlId="sku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="sku"
              placeholder="Enter SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <div className="container">
              <div class="col-md-8 px-0 mb-2">
                <Image src={image} alt={image} fluid />
              </div>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </div>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="productCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory([parseInt(e.target.value)])}
            >
              {productCategories.map((val) => (
                <option key={val.name} value={val.product_category_id}>
                  {val.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
