/**
 * Inventory - Inventory page for adding updating and deleting warehouses, and changing stock for items in warehouses
 */

import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import UpdateStockForm from "../components/warehouses/UpdateStockForm";
import AddNewItem from "../components/warehouses/AddNewItem";
import DeleteWarehouse from "../components/warehouses/DeleteWarehouse";
import UpdateWarehouse from "../components/warehouses/UpdateWarehouse";

export default function Inventory() {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [warehouseFormData, setWarehouseFormData] = useState({});

    // POST new warehouse to DB, then rerender data with set warehouses
    const handleNewWarehouseSubmit = (event) => {
        fetch('warehouses/newWarehouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouseFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                setWarehouses((oldState) => {
                    return [...oldState, data]
                })
                event.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // Fetches warehouses after a warehouse is updated and sets warehouses so the data rerenders
    function handleUpdateWarehouse(updatedWarehouse) {
        fetch('warehouses')
            .then((res) => res.json())
            .then((data) => {
                setWarehouses(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // Fetches warehouses after a warehouse is deleted and sets warehouses so the data rerenders
    function handleDeleteWarehouse(data) {
        fetch('warehouses')
            .then((res) => res.json())
            .then((data) => {
                setWarehouses(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    // Fetches items after an item(s) is added to a warehouse and sets warehouses so the data rerenders
    function handleAddItem(newItem) {
        fetch('items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    // Fetches items after updating stock and sets items so the data rerenders,
    // then fetches warehouses and sets warehouses so the data rerenders
    function handleUpdateStock(data) {
        fetch('items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            }).then(() => fetch('warehouses')
                .then((res) => res.json())
                .then((data) => {
                    setWarehouses(data);
                })
                .catch((err) => {
                    console.log(err.message);
                }))
    }

    const handleStringInputChange = (event) => {
        console.log(event.target.value)
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

    // Returns the count of items for a specific product in a specific warehouse
    const getItemCountByProductAndWarehouse = (warehouseId, productId) => {
        let count = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].product.productId === productId && items[i].warehouse.warehouseId === warehouseId) {
                count++;
            }
        }
        return count;
    }

    // Returns an array of all of the item objects in a given warehouse based on warehouse id
    const getItemsByWarehouseId = (warehouseId) => {
        let returnedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].warehouse.warehouseId === warehouseId) {
                returnedItems.push(items[i])
            }
        }
        return returnedItems;
    }

    // Returns an array of product objects that are contained in a warehouse. Filter() function is
    // used to remove duplicate products (we only want to show 1 of each product in our page,
    // and use the 'In Stock' column to show how many of each product we have in each warehouse )
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

    // Returns an array of items based on productId AND warehouseId
    const getItemsByWarehouseIdAndProductId = (warehouseId, productId) => {
        let filteredItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].warehouse.warehouseId === warehouseId && items[i].product.productId === productId) {
                filteredItems.push(items[i])
            }
        }
        return filteredItems;
    }

    // Returns the sum of the size * stock for each item in a given warehouse. This will tell us how far away we are from capacity.
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
                        <Form>
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
                // outer table (warehouses)
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

                                    <UpdateWarehouse warehouse={warehouse} handleUpdateWarehouse={handleUpdateWarehouse}></UpdateWarehouse>

                                    <div style={{ marginBottom: "1rem" }}></div>

                                    <AddNewItem
                                        warehouse={warehouse}
                                        products={products}
                                        inventoryCountSum={getInventoryCountSum(warehouse.warehouseId)}
                                        handleAddItem={handleAddItem}
                                    ></AddNewItem>

                                    <div style={{ marginBottom: "1rem" }}></div>

                                    <DeleteWarehouse warehouse={warehouse} itemsToDelete={getItemsByWarehouseId(warehouse.warehouseId)} handleDeleteWarehouse={handleDeleteWarehouse}></DeleteWarehouse>
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
                                                // inner table (products)
                                                getProductsByWarehouseId(warehouse.warehouseId).map((product, p) =>
                                                    <tr key={p}>
                                                        <td>{product.name}</td>
                                                        <td>{'$' + product.price}</td>
                                                        <td>{product.size}</td>
                                                        <td>{getItemCountByProductAndWarehouse(warehouse.warehouseId, product.productId)}</td>
                                                        <td>
                                                            <UpdateStockForm
                                                                warehouse={warehouse}
                                                                product={product}
                                                                existingCount={getItemCountByProductAndWarehouse(warehouse.warehouseId, product.productId)}
                                                                inventoryCountSum={getInventoryCountSum(warehouse.warehouseId)}
                                                                items={getItemsByWarehouseIdAndProductId(warehouse.warehouseId, product.productId)}
                                                                handleUpdateStock={handleUpdateStock}
                                                            ></UpdateStockForm>
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