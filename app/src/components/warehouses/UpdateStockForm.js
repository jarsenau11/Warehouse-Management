/**
 * UpdateStockForm - component used for updating the stock of a product in a warehouse
 *      Contains a CustomModal component with a form as the modal body
 */

import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

/**
 * @param handleUpdateStock - function to handle re-rendering of data after sending http request
 * @param warehouse - the warehouse that contains the product that is being updated
 * @param product - the product for which the stock will be updated
 * @param existingCount - existing stock of the product being updated
 * @param inventoryCountSum - x value in x/(warehouse capacity) --- this will be used to calculate if the add items operation will cause the capacity to be exceeded
 * @param items - all items associated with the product AND the warehouse
 */
export default function UpdateStockForm({ handleUpdateStock, warehouse, product, existingCount, inventoryCountSum, items }) {
    const [newCount, setNewCount] = useState(existingCount)

    // This function performs logic to determine what operation is being requested (add, delete some, or delete all items) and routes to the appropriate function
    function handleUpdateStockSubmit(event) {
        if (newCount == existingCount) { }   // if count hasn't changed, do nothing
        else if (newCount == 0) {            // if count is set to 0, delete all items
            deleteItems(items, event)
        }
        else if (newCount < existingCount) { // if new count is less than existing count, delete some items
            const numToDelete = existingCount - newCount;
            let itemsToDelete = [];
            for (let i = 0; i < numToDelete; i++) {
                itemsToDelete[i] = items[i];
            }
            deleteItems(itemsToDelete, event)
        }
        else {                               // else (new count is greater than existing count) -> add new items
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

    // Add new items to the DB
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

    // Delete items from the DB
    function deleteItems(itemsToDelete, event) {
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