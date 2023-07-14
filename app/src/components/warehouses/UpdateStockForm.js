import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function UpdateStockForm({ handleUpdateStock, warehouse, product, existingCount, inventoryCountSum, items }) {
    // const [warehouse, setWarehouse] = useState()
    const [newCount, setNewCount] = useState(existingCount)



    function handleUpdateStockSubmit(event) {

        if (newCount == existingCount) { }// do nothing
        else if (newCount == 0) { // delete all items
            deleteAllItems(items, event)
        }
        else if (newCount < existingCount) {
            const numToDelete = existingCount - newCount;
            let itemsToDelete = [];
            for (let i = 0; i < numToDelete; i++) {
                itemsToDelete[i] = items[i];
            }
            deleteSomeItems(itemsToDelete, event)
        }
        else {
            //post newCount - existingCount

            let quantityToAdd = newCount - existingCount

            if (quantityToAdd * product.size + inventoryCountSum > warehouse.capacity) {
                console.log('adding this product(s) would exceed the capacity of the warehouse') // exceeds capacity
            }
            else {
                let itemBaseArr = [];
                for (let i = 0; i < quantityToAdd; i++) {
                    itemBaseArr[i] = {
                        product: product,
                        warehouse: warehouse
                    }
                }
                addItems(itemBaseArr, event)
            }
        }
    }

    function addItems(itemBaseArr, event) {
        fetch('items/newItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemBaseArr)
        })
            .then((res) => res.json())
            .then((data) => {
                handleUpdateStock(data)
                event.target.reset()
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    function deleteAllItems(itemsToDelete, event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        })
            .then(() => {
                handleUpdateStock(event)
                event.target.reset()
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    function deleteSomeItems(itemsToDelete, event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        })
            .then(() => {
                handleUpdateStock(event)
                event.target.reset()
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    function handleCountChange(event) {
        // if (event.target.value >= 0 && warehouse.capacity >= (event.target.value * product.size + inventoryCountSum)) { setNewCount(event.target.value) }
        if (event.target.value >= 0) { setNewCount(event.target.value) }
    }

    return (
        <CustomModal
            buttonVariant="primary"
            buttonTitle="Update Stock"
            action="updateStock"
            modalHeading="Update Stock"
            submitButtonVariant="primary"
            cancelButtonVariant="secondary"
            modalBody={
                <Form
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Product</Form.Label>
                            <Form.Control
                                disabled
                                value={product.name}
                                type="text"
                                name="product"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                required
                                value={newCount}
                                onChange={handleCountChange}
                                type="number"
                                name="quantity"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleUpdateStockSubmit}
        ></CustomModal>
    );
}