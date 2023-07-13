import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    // const [error, setError] = useState();

    const [productSize, setProductSize] = useState(1);

    const [productFormData, setproductFormData] = useState(
        {
            name: '',
            productType: {},
            description: '',
            price: 0,
            size: 0
        }
    );

    // const [validated, setValidated] = useState(false);

    const handleNewProductSubmit = (event) => {

        fetch('products/newProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts((oldState) => {
                    return [...oldState, data]
                })
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });

        // setValidated(true);

    };


    const handleUpdateProductSubmit = (event) => {
        // if(updateProductTypeFormData.value exists (loop through productTypes)) { error } else {
            console.log(JSON.stringify(productFormData))

        fetch('products/product/updateProduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < products.length; i++) {
                    // this isn't working properly
                    if (products[i].productId == data.productId) {
                        products[i].name = data.name
                        products[i].productType = data.productType
                        products[i].description = data.description
                        products[i].price = data.price
                        products[i].size = data.size
                        break
                    }
                }
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });

        // setValidated(true);
    };


    
    const handleUpdateSetId = (productId) => {
        setproductFormData({
            ...productFormData,
            "productId": productId
        })
    }

    const handleJsonInputChange = (event) => {
        setproductFormData({
            ...productFormData,
            [event.target.name]: JSON.parse(event.target.value),
        })
    }

    const handleStringInputChange = (event) => {
        setproductFormData({
            ...productFormData,
            [event.target.name]: event.target.value,
        })
    }

    const handleNumberInputChange = (event) => {
        if(parseInt(event.target.value) <= 5 && parseInt(event.target.value) >= 1) {
            setProductSize(event.target.value)
            setproductFormData({
                ...productFormData,
                [event.target.name]: parseInt(event.target.value)
            })
        }
    }

    useEffect(() => {
        fetch('products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('warehouses')
            .then((res) => res.json())
            .then((data) => {
                setWarehouses(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('productTypes')
            .then((res) => res.json())
            .then((data) => {
                setProductTypes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    return (
        <div>
            {/** find a cool component to appear at the top of the page instead */}
            <h1>Product Management</h1>
            <div className="margin-top margin-bottom">
                <CustomModal
                    buttonVariant="success"
                    buttonTitle="Add New Product"
                    action="createProduct"
                    modalHeading="Add New Product"
                    submitButtonVariant="primary"
                    cancelButtonVariant="secondary"
                    modalBody={
                        <Form
                        //  noValidate validated={validated}
                         onSubmit={handleNewProductSubmit}
                         >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={handleStringInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product name
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select aria-label="Product Type" name="productType" onChange={handleJsonInputChange}>
                                        <option>Select a product type</option>
                                        {productTypes.map((productType) => (
                                            <option key={productType.productTypeId} value={JSON.stringify(productType)}>{productType.value}</option>
                                        ))}
                                    </Form.Select>


                                    {/* <Form.Control.Feedback type="invalid">
                                        
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        onChange={handleStringInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">

                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        onChange={handleNumberInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="size">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control
                                        required
                                        value={productSize}
                                        name="size"
                                        type="number"
                                        className="form-control"
                                        onChange={handleNumberInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>

                        </Form>
                    }
                    handleSubmit={handleNewProductSubmit} // this needs to be if(validated)
                >
                </CustomModal>
            </div>

            <table className="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th className="outer-table-headers">Product Name</th>
                        <th className="column-width-10 outer-table-headers">Product Type</th>
                        <th className="outer-table-headers">Description</th>
                        <th className="outer-table-headers">Price</th>
                        <th className="outer-table-headers">Size</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, p) =>
                            <tr key={p}>
                                <td>{product.name}</td>
                                <td>{product.productType.value}</td>
                                <td>{product.description}</td>
                                <td>{'$' + product.price}</td>
                                <td>{product.size}</td>
                                <td className="column-width-20">
                                    <CustomModal
                                        buttonVariant="primary"
                                        buttonTitle="Update"
                                        action="updateProduct"
                                        modalHeading="Update Product"
                                        submitButtonVariant="primary"
                                        cancelButtonVariant="secondary"
                                        productId={product.productId}
                                        modalBody={
                                            <Form
                                            // noValidate validated={validated}
                                            onSubmit={handleUpdateProductSubmit}
                                            >
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="name">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            defaultValue={product.name}
                                                            name="name"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleStringInputChange}
                                                        />
                                                        {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product name
                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="type">
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Select aria-label="Product Type" name="productType" defaultValue={product.productType.value} onChange={handleJsonInputChange}>
                                                            {/* <option>Select a product type</option> */}
                                                            {productTypes.map((productType) => (
                                                                <option key={productType.productTypeId} value={JSON.stringify(productType)}>{productType.value}</option>
                                                            ))}
                                                        </Form.Select>


                                                        {/* <Form.Control.Feedback type="invalid">
                                        
                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="description">
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control
                                                            required
                                                            name="description"
                                                            defaultValue={product.description}
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleStringInputChange}
                                                        />
                                                        {/* <Form.Control.Feedback type="invalid">

                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>


                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="price">
                                                        <Form.Label>Price</Form.Label>
                                                        <Form.Control
                                                            required
                                                            name="price"
                                                            defaultValue={product.price}
                                                            type="number"
                                                            className="form-control"
                                                            onChange={handleNumberInputChange}
                                                        />
                                                        {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="size">
                                                        <Form.Label>Size</Form.Label>
                                                        <Form.Control
                                                            required
                                                            name="size"
                                                            defaultValue={product.size}
                                                            type="number"
                                                            className="form-control"
                                                            onChange={handleNumberInputChange}
                                                        />
                                                        {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>

                                            </Form>
                                        }
                                        handleSubmit={handleUpdateProductSubmit} // this needs to be if(validated)
                                    >
                                    </CustomModal>
                                    <button type="button" className="margin-left btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}