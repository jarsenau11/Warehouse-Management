import React, { useEffect, useState } from "react";
import CustomModal from "../components/Modal";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    // const [error, setError] = useState();

    const [newProductFormData, setNewProductFormData] = useState(
    //     {
    //     name: '',
    //     productType: {},
    //     description: '',
    //     price: 0,
    //     size: 0
    // }
    );

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // fetch('productTypes/newProductType', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newProductFormData)
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setProducts([...products, ...data]);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        console.log(newProductFormData);

        setValidated(true);

    };

    const test = (event) => {
        console.log(event.target.value)
        // console.log(JSON.parse(event.target.value))
    }

    const handleInputChange = (event) => {
        setNewProductFormData({
            ...newProductFormData,
            [event.target.name]: event.target.value,
            // 'name': event.target.name,
            // 'productType': event.target.type,
            // 'description': event.target.description,
            // 'price': event.target.price,
            // 'size': event.target.size
        })
        // console.log(newProductFormData)
        // console.log(newProductFormData.productType)
    }

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


    return (
        <div>
            {/** find a cool component to appear at the top of the page instead */}
            <h1>Product Management</h1>
            <div className="margin-top margin-bottom">
                <CustomModal
                    buttonTitle="Add New Product"
                    action="createProduct"
                    modalHeading="Add New Product"
                    submitButtonVariant="primary"
                    cancelButtonVariant="secondary"
                    modalBody={
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                        Please enter a value that does not match an existing product name
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select aria-label="Product Type" name="productType" onChange={test}>
                                        <option>Select a product type</option>
                                        {productTypes.map((productType) => (
                                            <option key={productType.productTypeId} value={productType}>{productType.value}</option>
                                        ))}
                                    </Form.Select>


                                    {/* <Form.Control.Feedback type="invalid">
                                        
                                    </Form.Control.Feedback> */}
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    name="description"
                                    type="text"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                                {/* <Form.Control.Feedback type="invalid">

                                    </Form.Control.Feedback> */}
                            </Form.Group>
                            </Row>


                            <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    name="price"
                                    type="text"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                    
                                    </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="size">
                                <Form.Label>Size</Form.Label>
                                <Form.Control
                                    required
                                    name="size"
                                    type="number"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                    
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