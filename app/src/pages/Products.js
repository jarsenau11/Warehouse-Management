import React, { useEffect, useState } from "react";

export default function Products() {

    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('products')
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
                <p>[{data.name}] {data.price}</p>
            ))}
        </div>
    )
    
}