import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function AddNewItem({ handleAddItem, warehouse, products, inventoryCountSum, items }) {
    // const [warehouse, setWarehouse] = useState()
    const [count, setCount] = useState(0)
    const [newProduct, setNewProduct] = useState(products[0])


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
                    // handleAddItem(data)
                    // event.target.reset()
                })
                .catch((err) => {
                    console.log(err.message);
                });
    }

    function handleCountChange(event) {
        if (event.target.value >= 0) { setCount(event.target.value) }
    }

    function handleProductChange(event) {
        setNewProduct(event.target.value)
    }

    return (
        <CustomModal
            buttonVariant="success"
            buttonTitle="Add New Product"
            action="addNewProduct"
            modalHeading="Add New Product"
            submitButtonVariant="primary"
            cancelButtonVariant="secondary"
            // handleInitialButtonClick={setWarehouseToAddTo(warehouse)}
            modalBody={
                <Form
                // noValidate validated={validated} onSubmit={handleAddItemSubmit}
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