/**
 * UpdateProduct - Component used for updating products
 *      Contains a CustomModal with a form as the body
 */

import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

/**
 * @param handleUpdateProduct - function to handle re-rendering of data after sending http request
 * @param product - product to be updated
 * @param productTypes - all product types (for displaying in the dropdown)
 */
export default function UpdateProduct({ handleUpdateProduct, product, productTypes }) {

    const [productFormData, setProductFormData] = useState(product) // form data gets initial state of the product to be updated
    const [productType, setProductType] = useState(product.productType)

    // Update form data when the product name changes (the rest of the handle functions below do the same thing but for the other input fields)
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


    // Send PUT request with the form data in the body
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
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Product Type" name="productType" value={productType.name} onChange={handleProductTypeChange}>
                                {productTypes.map((prodType) => (
                                    <option key={prodType.productTypeId} defaultValue={productType.name} value={JSON.stringify(prodType)}>{prodType.value}</option>
                                ))}
                            </Form.Select>
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
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleUpdateProductSubmit}
        >
        </CustomModal>
    );
}