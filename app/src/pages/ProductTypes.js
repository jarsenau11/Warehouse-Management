import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DeleteProductType from "../components/productTypes/DeleteProductType";

export default function Products() {
    const [productTypes, setProductTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    // const [error, setError] = useState();
    const [newProductTypeFormData, setNewProductTypeFormData] = useState();
    const [updateProductTypeFormData, setUpdateProductTypeFormData] = useState({});
    const [deleteProductType, setDeleteProductType] = useState();

    // const [validated, setValidated] = useState(false);

    const handleNewProductTypeSubmit = (event) => {

        fetch('productTypes/newProductType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProductTypeFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                setProductTypes((oldState) => {
                    return [...oldState, data]
                })
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });

        // setValidated(true);

    };

    const handleUpdateProductTypeSubmit = (event) => {
        // if(updateProductTypeFormData.value exists (loop through productTypes)) { error } else {
        if(updateProductTypeFormData == null || updateProductTypeFormData == undefined || updateProductTypeFormData.length == 0) {} 
        else {
        fetch('productTypes/productType/updateProductType', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateProductTypeFormData)
        })
            .then((res) => res.json())
            .then(() => {
                fetch('productTypes')
                .then((res) => res.json())
                .then((data) => {
                    setProductTypes(data);
                })
                .catch((err) => {
                    console.log(err.message);
                })
            })
            .catch((err) => {
                console.log(err.message);
            });
        }

    };

    const handleDeleteProductTypeSubmit = (event) => {
        fetch('productTypes')
            .then((res) => res.json())
            .then((data) => {
                setProductTypes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const getProductsByProductTypeId = (productTypeId) => {
        let returnedProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].productType.productTypeId === productTypeId) {
                returnedProducts.push(products[i])
            }
        }
        return returnedProducts;
    }

    const getItemsByProductTypeId = (productTypeId) => {
        let products = getProductsByProductTypeId(productTypeId)
        let returnedItems = [];
        for (let i = 0; i < items.length; i++) {
            for(let j = 0; j < products.length; j++) {
                if (items[i].product.productId === products[j].productId) {
                    returnedItems.push(items[i])
                }
            }
        }
        return returnedItems;
    }

    const handleNewProductTypeInputChange = (event) => {
        setNewProductTypeFormData({
            'value': event.target.value
        })
    }

    const handleUpdateProductTypeInputChange = (event) => {
        setUpdateProductTypeFormData({
            'productTypeId': event.target.id,
            'value': event.target.value
        })
    }

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

    return (
        <div className="small-container">
            {/** find a cool component to appear at the top of the page instead */}
            <h1 className="text-center">Product Type Management</h1>

            <div className="margin-top margin-bottom">
                <CustomModal
                    buttonVariant="success"
                    buttonTitle="Add New Product Type"
                    action="createProductType"
                    modalHeading="Add New Product Type"
                    submitButtonVariant="primary"
                    cancelButtonVariant="secondary"
                    modalBody={
                        <Form
                            // noValidate validated={validated}
                            onSubmit={handleNewProductTypeSubmit}
                        >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="productType">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className="form-control"
                                        onChange={handleNewProductTypeInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product type
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>
                        </Form>
                    }
                    handleSubmit={handleNewProductTypeSubmit} // this needs to be if(validated)?
                >
                </CustomModal>
            </div>

            <table className="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th className="outer-table-headers">Product Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productTypes.map((productType, p) =>
                            <tr key={p}>
                                <td className="column-width-50">{productType.value}</td>
                                <td className="column-width-25">
                                    <CustomModal
                                        buttonTitle="Update"
                                        buttonStyle={{marginRight:"20px"}}
                                        action="updateProductType"
                                        modalHeading="Update Product Type"
                                        submitButtonVariant="primary"
                                        cancelButtonVariant="secondary"
                                        modalBody={
                                            <Form
                                                // noValidate validated={validated}
                                                onSubmit={handleUpdateProductTypeSubmit}
                                            >
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="8">
                                                        <Form.Label>Product Type</Form.Label>
                                                        <Form.Control
                                                            required
                                                            defaultValue={productType.value}
                                                            id={productType.productTypeId}
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleUpdateProductTypeInputChange}
                                                        />
                                                        {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product type
                                    </Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                            </Form>
                                        }
                                        handleSubmit={handleUpdateProductTypeSubmit} // this needs to be if(validated)?
                                    >
                                    </CustomModal>
                                    
                                    <DeleteProductType productType={productType} productsToDelete={getProductsByProductTypeId(productType.productTypeId)} itemsToDelete={getItemsByProductTypeId(productType.productTypeId)} handleDeleteProductType={handleDeleteProductTypeSubmit}></DeleteProductType>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}