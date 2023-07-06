import React, { useEffect, useState } from "react";

export default function ProductTypes() {
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('productTypes')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setError(err);
                console.log(err.message);
            });
    }, []);
    return (
        <div>
            {data.map((data) => (
                <p>[{data.productTypeId}] {data.value}</p>
            ))}
        </div>
    )
}