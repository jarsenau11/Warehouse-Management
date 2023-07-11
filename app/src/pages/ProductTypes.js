import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Products() {
    const [productTypes, setProductTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    // const [error, setError] = useState();
    const [newProductTypeFormData, setNewProductTypeFormData] = useState();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        fetch('productTypes/newProductType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProductTypeFormData)
        })
            .then((res) => res.json())
            .then((data) => {
                setProductTypes([...productTypes, ...data]);
            })
            .catch((err) => {
                console.log(err.message);
            });

        setValidated(true);

    };

    const handleInputChange = (event) => {
        setNewProductTypeFormData({
            'value': event.target.value
        })
    }

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
                <CustomModal
                    buttonTitle="Add New Product Type"
                    action="createProductType"
                    modalHeading="Add New Product Type"
                    submitButtonVariant="primary"
                    cancelButtonVariant="secondary"
                    modalBody={
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="productType">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product type
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>
                        </Form>
                    }
                    handleSubmit={handleSubmit} // this needs to be if(validated)
                >
                </CustomModal>
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