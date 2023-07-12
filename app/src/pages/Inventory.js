import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Inventory() {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [itemCountByProductAndWarehouse, setItemCountByProductAndWarehouse] = useState([]);
    // const [error, setError] = useState();

    const [productsByWarehouse, setProductsByWarehouse] = useState([]);

    const [warehouseFormData, setWarehouseFormData] = useState([]);

    const [validated, setValidated] = useState(false);


    const handleNewWarehouseSubmit = (event) => {

        console.log(warehouseFormData)

        fetch('warehouses/newWarehouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouseFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                setWarehouses([...warehouses, ...data]);
            })
            .catch((err) => {
                console.log(err.message);
            });

        setValidated(true);

    };

    const handleUpdateWarehouseSubmit = (event) => {
        // if(updateProductTypeFormData.value exists (loop through productTypes)) { error } else {
            console.log(JSON.stringify(warehouseFormData))

        fetch('warehouses/warehouse/updateWarehouse', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouseFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < warehouses.length; i++) {
                    if (warehouses[i].warehouseId == data.warehouseId) {
                        warehouses[i].name = data.name
                        warehouses[i].productType = data.productType
                        warehouses[i].description = data.description
                        warehouses[i].price = data.price
                        warehouses[i].size = data.size
                        break
                    }
                }
            })
            .catch((err) => {
                console.log(err.message);
            });

        setValidated(true);
    };

    const handleStringInputChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            [event.target.name]: event.target.value,
        })
    }

    const handleNumberInputChange = (event) => {
        setWarehouseFormData({
            ...warehouseFormData,
            [event.target.name]: parseInt(event.target.value),
        })
    }

    useEffect(() => {
        fetch('warehouses')
            .then((res) => res.json())
            .then((data) => {
                setWarehouses(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const getItemCountByProductAndWarehouse = (warehouseId, productId) => {
        let count = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].product.productId === productId && items[i].warehouse.warehouseId === warehouseId) {
                count++;
            }
        }
        return count;
    }

    const getProductsByWarehouseId = (warehouseId) => {
        let products = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].warehouse.warehouseId === warehouseId) {
                if (products.includes(items[i].product)) { }
                else {
                    products.push(items[i].product)
                }
            }
        }
        let set = new Set();
        let productsUnion = products.filter((product) => {
            const id = product['productId'];
            if (set.has(id)) {
                return false
            }
            set.add(id);
            return true;
        })
        return productsUnion;
    }

    const getInventoryCountSum = (warehouseId) => {
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].warehouse.warehouseId === warehouseId) {
                sum = sum + items[i].product.size;
            }
        }
        return sum;
    }

    return (

        <div>
            {/** find a cool component to appear at the top of the page instead */}
            <h1>Inventory Management</h1>
            <div className="margin-top margin-bottom">

                <CustomModal
                    buttonVariant="success"
                    buttonTitle="Add New Warehouse"
                    action="createWarehouse"
                    modalHeading="Add New Warehouse"
                    submitButtonVariant="primary"
                    cancelButtonVariant="secondary"
                    modalBody={
                        <Form noValidate validated={validated} onSubmit={handleNewWarehouseSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="validationCustom01">
                                    <Form.Label>Warehouse Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        onChange={handleStringInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        There is already a warehouse with this name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                    <Form.Label>Capacity</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="capacity"
                                        onChange={handleNumberInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid capacity.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="7" controlId="validationCustom03">
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="text" name="street" required onChange={handleStringInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid street.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="validationCustom04">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" name="city" required onChange={handleStringInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom05">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" name="state" required onChange={handleStringInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom06">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="number" name="zip" required onChange={handleNumberInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid zip.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Form>
                    }
                    handleSubmit={handleNewWarehouseSubmit}
                >
                </CustomModal>
            </div>
            {
                warehouses.map((warehouse, w) =>
                    <table key={w} className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th className="outer-table-headers">Warehouse Name</th>
                                <th className="outer-table-headers">Street</th>
                                <th className="outer-table-headers">City</th>
                                <th className="outer-table-headers">State</th>
                                <th className="outer-table-headers">Zip</th>
                                <th className="outer-table-headers">Capacity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{warehouse.name}</td>
                                <td>{warehouse.street}</td>
                                <td>{warehouse.city}</td>
                                <td>{warehouse.state}</td>
                                <td>{warehouse.zip}</td>
                                <td>{getInventoryCountSum(warehouse.warehouseId) + '/' + warehouse.capacity}</td>
                                <td>
                                    <CustomModal
                                        buttonVariant="success"
                                        buttonTitle="Update Warehouse"
                                        action="updateWarehouse"
                                        modalHeading="Update Warehouse"
                                        submitButtonVariant="primary"
                                        cancelButtonVariant="secondary"
                                        modalBody={
                                            <Form noValidate validated={validated} onSubmit={handleUpdateWarehouseSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="8" controlId="validationCustom01">
                                                        <Form.Label>Warehouse Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            name="name"
                                                            defaultValue={warehouse.name}
                                                            onChange={handleStringInputChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            There is already a warehouse with this name
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                        <Form.Label>Capacity</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            name="capacity"
                                                            defaultValue={warehouse.capacity}
                                                            onChange={handleNumberInputChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid capacity.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="7" controlId="validationCustom03">
                                                        <Form.Label>Street</Form.Label>
                                                        <Form.Control type="text" name="street" defaultValue={warehouse.street} required onChange={handleStringInputChange} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid street.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="5" controlId="validationCustom04">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control type="text" name="city" defaultValue={warehouse.city} required onChange={handleStringInputChange} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid city.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Control type="text" name="state" defaultValue={warehouse.state} required onChange={handleStringInputChange} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                                                        <Form.Label>Zip</Form.Label>
                                                        <Form.Control type="number" name="zip" defaultValue={warehouse.zip} required onChange={handleNumberInputChange} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid zip.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                            </Form>
                                        }
                                        handleSubmit={handleUpdateWarehouseSubmit}
                                    >
                                    </CustomModal>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="7">
                                    <table className="table table-secondary table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Size</th>
                                                <th>In Stock</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getProductsByWarehouseId(warehouse.warehouseId).map((product, p) =>
                                                    <tr key={p}>
                                                        <td>{product.name}</td>
                                                        <td>{'$' + product.price}</td>
                                                        <td>{product.size}</td>
                                                        <td>{getItemCountByProductAndWarehouse(warehouse.warehouseId, product.productId)}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-primary">
                                                                Update Stock
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}