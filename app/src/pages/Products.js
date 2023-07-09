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
            <div className="margin-top margin-bottom">
                <button className="btn btn-success">Create New Product</button>
            </div>

            <table className="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th className="outer-table-headers">Product Name</th>
                        <th className="column-width-10 outer-table-headers">Product Type</th>
                        <th className="outer-table-headers">Description</th>
                        <th className="outer-table-headers">Price</th>
                        <th className="outer-table-headers">Size</th>
                        <th></th>
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
                                <td className="column-width-20">
                                    <button type="button" className="margin-right btn btn-primary">
                                        Update
                                    </button>
                                    <button type="button" className="margin-left btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}