import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function DeleteWarehouse({ handleDeleteWarehouse, warehouse, itemsToDelete }) {

    function handleDeleteWarehouseSubmit(event) {
        if (itemsToDelete == null || itemsToDelete == undefined || itemsToDelete.length == 0) {
            deleteWarehouse(event)
        }
        else {
            deleteItemsAndWarehouse(event)
        }
    }

    function deleteItemsAndWarehouse(event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        }).then(() => {
            fetch('warehouses/warehouse/delete/' + warehouse.warehouseId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    function deleteWarehouse(event) {
        fetch('warehouses/warehouse/delete/' + warehouse.warehouseId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <CustomModal
            buttonVariant="danger"
            buttonTitle="Delete Warehouse"
            action="deleteWarehouse"
            modalHeading="Are you sure you want to delete this warehouse? All inventory for this warehouse will also be deleted."
            submitButtonVariant="danger"
            cancelButtonVariant="secondary"
            modalBody={
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Warehouse Name</Form.Label>
                            <Form.Control disabled value={warehouse.name}></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleDeleteWarehouseSubmit}
        >
        </CustomModal>
    );
}