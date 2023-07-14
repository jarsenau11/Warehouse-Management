/**
 * AddNewItem - component used for adding new items to the database
 *      Contains a CustomModal component with a form as the modal body
 */

import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

/**
 * @param handleAddItem - function to handle re-rendering of data after sending http request
 * @param warehouse - the warehouse to associate with the item
 * @param products - all products (for display in the dropdown)
 * @param inventoryCountSum - x value in x/(warehouse capacity) --- this will be used to calculate if the add item operation will cause the capacity to be exceeded
 */
export default function AddNewItem({ handleAddItem, warehouse, products, inventoryCountSum }) {
    const [count, setCount] = useState(0)
    const [newProduct, setNewProduct] = useState(products[0])

    // On submit via the modal, build new array of items to add, then check if capacity would be exceeded by adding those items (if yes, don't add, otherwise call addItems())
    function handleAddItemSubmit(event) {
        if(newProduct == undefined || newProduct == null) {
            setNewProduct(products[0])
        }
        if (count == 0) { }// do nothing
        else {
            let itemBaseArr = [];
            for (let i = 0; i < count; i++) {
                itemBaseArr[i] = {
                    product: newProduct == undefined ? products[0] : JSON.parse(newProduct),
                    warehouse: warehouse
                }
            }

            if (count * (newProduct == undefined ? products[0].size : newProduct.size) + inventoryCountSum > warehouse.capacity) {
                console.log('adding this product(s) would exceed the capacity of the warehouse') // exceeds capacity
            }
            else {
                console.log(count * (newProduct == undefined ? products[0].size : newProduct.size) + inventoryCountSum)
                addItems(itemBaseArr, event)
            }
        }
    }

    // Takes in array of new items and sends the array as the body of the POST request
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
                    handleAddItem(data)
                    event.target.reset()
                })
                .catch((err) => {
                    console.log(err.message);
                });
    }

    function handleCountChange(event) {
        // if (event.target.value >= 0 && ((event.target.value * newProduct.size + inventoryCountSum) <= warehouse.capacity)) { setCount(event.target.value) }
        if (event.target.value >= 0) { setCount(event.target.value) }
    }

    function handleProductChange(event) {
        setCount(0)
        setNewProduct(event.target.value)

    }

    function handleModalClick() {
        setCount(0)
    }

    return (
        <CustomModal
            buttonVariant="primary"
            buttonTitle="Add New Product"
            action="addNewProduct"
            modalHeading="Add New Product"
            submitButtonVariant="primary"
            cancelButtonVariant="secondary"
            handleInitialButtonClick={handleModalClick}
            modalBody={
                <Form
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Product</Form.Label>
                            <Form.Select aria-label="Product" name="product" onChange={handleProductChange}>
                                {/* <option>Select a product type</option> */}
                                {products.map((prod, p) => (
                                    <option key={p} value={JSON.stringify(prod)}>{prod.name} (size = {prod.size})</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                required
                                value={count}
                                onChange={handleCountChange}
                                type="number"
                                name="quantity"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleAddItemSubmit}
        >
        </CustomModal>
    );
}