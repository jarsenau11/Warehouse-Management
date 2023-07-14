import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

export default function UpdateWarehouse({ handleUpdateWarehouse, warehouse }) {

    const [warehouseFormData, setWarehouseFormData] = useState(warehouse)

    const handleWarehouseNameChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "name": event.target.value,
        })
    }

    const handleWarehouseCapacityChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "capacity": event.target.value,
        })
    }

    const handleWarehouseStreetChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "street": event.target.value,
        })
    }

    const handleWarehouseCityChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "city": event.target.value,
        })
    }

    const handleWarehouseStateChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "state": event.target.value,
        })
    }

    const handleWarehouseZipChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            "zip": event.target.value,
        })
    }

    const handleUpdateWarehouseSubmit = (event) => {
        fetch('warehouses/warehouse/updateWarehouse', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouseFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                handleUpdateWarehouse(data)
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <CustomModal
            buttonVariant="success"
            buttonTitle="Update Warehouse"
            action="updateWarehouse"
            modalHeading="Update Warehouse"
            submitButtonVariant="primary"
            cancelButtonVariant="secondary"
            modalBody={
                <Form
                    // noValidate validated={validated} 
                    onSubmit={handleUpdateWarehouseSubmit}
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Warehouse Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                value={warehouseFormData.name}
                                onChange={handleWarehouseNameChange}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                                            There is already a warehouse with this name
                                                        </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="capacity"
                                value={warehouseFormData.capacity}
                                onChange={handleWarehouseCapacityChange}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                Please provide a valid capacity.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" name="street" value={warehouseFormData.street} required onChange={handleWarehouseStreetChange} />
                            {/* <Form.Control.Feedback type="invalid">
                                Please provide a valid street.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="validationCustom04">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={warehouseFormData.city} required onChange={handleWarehouseCityChange} />
                            {/* <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={warehouseFormData.state} required onChange={handleWarehouseStateChange} />
                            {/* <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom06">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="number" name="zip" value={warehouseFormData.zip} required onChange={handleWarehouseZipChange} />
                            {/* <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleUpdateWarehouseSubmit}
        >
        </CustomModal>);
}