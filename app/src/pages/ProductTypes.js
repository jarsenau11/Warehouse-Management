import React, { useEffect, useState } from "react";

export default function Products() {
    const [productTypes, setProductTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    // const [error, setError] = useState();

    useEffect(() => {
        fetch('productTypes')
            .then((res) => res.json())
            .then((data) => {
                setProductTypes(data);
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
        <div className="small-container">
            {/** find a cool component to appear at the top of the page instead */}
            <h1 className="text-center">Product Type Management</h1>
            <div className="margin-top margin-bottom">
                <button className="btn btn-success">Create New Product Type</button>
            </div>

            <table className="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th className="outer-table-headers">Product Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productTypes.map((productType, p) =>
                            <tr key={p}>
                                <td className="column-width-50">{productType.value}</td>
                                <td className="column-width-25">
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