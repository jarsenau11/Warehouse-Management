import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function UpdateProduct({ handleUpdateProduct, product, productTypes }) {

    const [productFormData, setProductFormData] = useState(product)
    const [productType, setProductType] = useState(product.productType)

    const handleProductNameChange = (event) => {
        setProductFormData({
            ...productFormData,
            "name": event.target.value,
        })
    }


    const handleProductTypeChange = (event) => {
        setProductType(event.target.value)
        setProductFormData({
            ...productFormData,
            "productType": JSON.parse(event.target.value),
        })
    }

    const handleProductDescriptionChange = (event) => {
        setProductFormData({
            ...productFormData,
            "description": event.target.value,
        })
    }

    const handleProductPriceChange = (event) => {
        if(event.target.value > 0) {
            setProductFormData({
                ...productFormData,
                "price": event.target.value,
            })
        }
    }

    const handleProductSizeChange = (event) => {
        if(event.target.value > 0 && event.target.value <= 5) {
            setProductFormData({
                ...productFormData,
                "size": event.target.value,
            })
        }
    }


    const handleUpdateProductSubmit = (event) => {
        fetch('products/product/updateProduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                handleUpdateProduct(data)
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <CustomModal
            buttonVariant="primary"
            buttonStyle={{ marginRight: "20px" }}
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
                                value={productFormData.name}
                                name="name"
                                type="text"
                                className="form-control"
                                onChange={handleProductNameChange}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product name
                                    </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Product Type" name="productType" value={productType.value} onChange={handleProductTypeChange}>
                                {productTypes.map((prodType) => (
                                    <option key={prodType.productTypeId} defaultValue={productType.value} value={JSON.stringify(prodType)}>{prodType.value}</option>
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
                                value={productFormData.description}
                                type="text"
                                className="form-control"
                                onChange={handleProductDescriptionChange}
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
                                value={productFormData.price}
                                type="number"
                                className="form-control"
                                onChange={handleProductPriceChange}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="size">
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                                required
                                name="size"
                                value={productFormData.size}
                                type="number"
                                className="form-control"
                                onChange={handleProductSizeChange}
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
    );
}