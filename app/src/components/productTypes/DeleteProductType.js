import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function DeleteProductType({ handleDeleteProductType, productType, productsToDelete, itemsToDelete }) {

    function handleDeleteProductTypeSubmit(event) {
        if ((productsToDelete == null || productsToDelete == undefined || productsToDelete.length == 0) && (itemsToDelete == null || itemsToDelete == undefined || itemsToDelete.length == 0)) {
            deleteProductType(event)
        }
        else if((itemsToDelete == null || itemsToDelete == undefined || itemsToDelete.length == 0)) {
            deleteProductsAndProductType(event)
        }
        else {
            deleteItemsAndProductsAndProductType(event)
        }
    }

    function deleteItemsAndProductsAndProductType(event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        }).then(() => {
            fetch('products/delete/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productsToDelete)
            })
                .catch((err) => {
                    console.log(err.message);
                })
        }).then(() => {
            fetch('productTypes/productType/delete/' + productType.productTypeId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProductType(data)
                event.target.reset();
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    function deleteProductsAndProductType(event) {
        fetch('products/delete/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productsToDelete)
        }).then(() => {
            fetch('productTypes/productType/delete/' + productType.productTypeId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProductType(data)
                event.target.reset();
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    function deleteProductType(event) {
        fetch('productTypes/productType/delete/' + productType.productTypeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            handleDeleteProductType(data)
            event.target.reset();
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <CustomModal
            buttonVariant="danger"
            buttonTitle="Delete"
            action="deleteProductType"
            modalHeading="Are you sure you want to delete this product type? All products of this type will also be deleted, as well as any inventory."
            submitButtonVariant="danger"
            cancelButtonVariant="secondary"
            modalBody={
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control disabled value={productType.value}></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleDeleteProductTypeSubmit}
        >
        </CustomModal>
    );
}