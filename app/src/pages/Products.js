import React, { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    // const [error, setError] = useState();

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
        fetch('items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            {/** find a cool component to appear at the top of the page instead */}
            <h1>Product Management</h1>

            <table class="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th class="outer-table-headers">Product Name</th>
                        <th class="column-width-10 outer-table-headers">Product Type</th>
                        <th class="outer-table-headers">Description</th>
                        <th class="outer-table-headers">Price</th>
                        <th class="outer-table-headers">Size</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, p) =>
                            <tr key={p}>
                                <td>{product.name}</td>
                                <td>{product.productType.value}</td>
                                <td>{product.description}</td>
                                <td>{'$' + product.price}</td>
                                <td>{product.size}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}