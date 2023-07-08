import React, { useEffect, useState } from "react";

export default function Inventory() {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [itemCountByProductAndWarehouse, setItemCountByProductAndWarehouse] = useState([]);
    // const [error, setError] = useState();

    const [productsByWarehouse, setProductsByWarehouse] = useState([]);

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
            <div>
                <button>Add Warehouse</button>
            </div>
            {
                warehouses.map((warehouse, w) =>
                    <table key={w} class="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th class="outer-table-headers">Warehouse Name</th>
                                <th class="outer-table-headers">Street</th>
                                <th class="outer-table-headers">City</th>
                                <th class="outer-table-headers">State</th>
                                <th class="outer-table-headers">Zip</th>
                                <th class="outer-table-headers">Capacity</th>
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
                            </tr>
                            <tr>
                                <td colspan="6">
                                    <table class="table table-secondary table-bordered">
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
                                                        <td>Update Stock</td>
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