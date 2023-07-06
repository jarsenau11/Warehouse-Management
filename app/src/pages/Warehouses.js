import React, { useEffect, useState } from "react";

export default function Warehouses() {
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('warehouses')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.name);
                setData(data);
            })
            .catch((err) => {
                setError(err);
                console.log(err.message);
            });
    }, []);
    return (
        <div className="pages-div">
            {data.map((data) => (
                <p>[{data.name}] {data.capacity}</p>
            ))}
        </div>
    )

}

