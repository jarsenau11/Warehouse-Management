import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DeleteProduct from "../components/products/DeleteProduct";
import UpdateProduct from "../components/products/UpdateProduct";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    // const [error, setError] = useState();

    const [productSize, setProductSize] = useState(1);
    const [productPrice, setProductPrice] = useState(1.00);

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


    function handleUpdateProduct(updatedProduct) {
        fetch('products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    function handleDeleteProduct(data) {
        fetch('products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    const getItemsByProductId = (productId) => {
        let returnedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].product.productId === productId) {
                returnedItems.push(items[i])
            }
        }
        return returnedItems;
    }

    const handleUpdateSetId = (productId) => {
        setproductFormData({
            ...productFormData,
            "productId": productId
        })
    }

    const handleProductTypeChange = (event) => {
        setproductFormData({
            ...productFormData,
            [event.target.name]: JSON.parse(event.target.value)
        })
    }

    const handleNameChange = (event) => {
        setproductFormData({
            ...productFormData,
            [event.target.name]: event.target.value
        })
    }
    const handleDescriptionChange = (event) => {
        setproductFormData({
            ...productFormData,
            [event.target.name]: event.target.value
        })
    }

    const handlePriceChange = (event) => {
        if (event.target.value >= 1) {
            setProductPrice(event.target.value)
            setproductFormData({
                ...productFormData,
                [event.target.name]: event.target.value
            })
        }
    }

    const handleSizeChange = (event) => {
        if (parseInt(event.target.value) <= 5 && parseInt(event.target.value) >= 1) {
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
                                        onChange={handleNameChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product name
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select aria-label="Product Type" name="productType" onChange={handleProductTypeChange}>
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
                                        onChange={handleDescriptionChange}
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
                                        value={productPrice}
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        onChange={handlePriceChange}
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
                                        onChange={handleSizeChange}
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
                                <td>{'$' + product.price.toFixed(2)}</td>
                                <td>{product.size}</td>
                                <td className="column-width-20">
                                    <UpdateProduct product={product} productTypes={productTypes} handleUpdateProduct={handleUpdateProduct}></UpdateProduct>
                                    <DeleteProduct product={product} itemsToDelete={getItemsByProductId(product.productId)} handleDeleteProduct={handleDeleteProduct} />
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}