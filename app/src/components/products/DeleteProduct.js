import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function DeleteProduct({ handleDeleteProduct, product, itemsToDelete }) {

    function handleDeleteProductSubmit(event) {
        if (itemsToDelete == null || itemsToDelete == undefined || itemsToDelete.length == 0) {
            deleteProduct(event)
        }
        else {
            deleteItemsAndProduct(event)
        }
    }

    function deleteItemsAndProduct(event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        }).then(() => {
            fetch('products/product/delete/' + product.productId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProduct(data)
                event.target.reset();
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    function deleteProduct(event) {
        fetch('products/product/delete/' + product.productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            handleDeleteProduct(data)
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
            action="deleteProduct"
            modalHeading="Are you sure you want to delete this product? All inventory for this product will also be deleted."
            submitButtonVariant="danger"
            cancelButtonVariant="secondary"
            modalBody={
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled value={product.name}></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleDeleteProductSubmit}
        >
        </CustomModal>
    );
}