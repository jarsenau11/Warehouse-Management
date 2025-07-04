/**
 * DeleteProductType - component used for deleting product types
 *      Contains a CustomModal component with a form as the modal body
 */

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

/**
 * @param handleDeleteProductType - function to handle re-rendering of data after sending http request
 * @param productType - the product type that will be deleted
 * @param productsToDelete (optional) - products associated with the product type which will also be deleted
 * @param itemsToDelete (optional) - items associated with the product which will also be deleted
 */
export default function DeleteProductType({ handleDeleteProductType, productType, productsToDelete, itemsToDelete }) {

    // Determines whether there are any items and/or products to delete before the product type, and calls the appropriate function
    function handleDeleteProductTypeSubmit(event) {
        if ((productsToDelete == null || productsToDelete === undefined || productsToDelete.length === 0) && (itemsToDelete == null || itemsToDelete === undefined || itemsToDelete.length === 0)) {
            deleteProductType(event)
        }
        else if ((itemsToDelete == null || itemsToDelete === undefined || itemsToDelete.length === 0)) {
            deleteProductsAndProductType(event)
        }
        else {
            deleteItemsAndProductsAndProductType(event)
        }
    }

    // If there are items and products associated with the product type, this function will be called (and will delete items -> products -> product type)
    function deleteItemsAndProductsAndProductType(event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        }).then(() => {
            fetch('products/delete/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productsToDelete)
            })
                .catch((err) => {
                    console.log(err.message);
                })
        }).then(() => {
            fetch('productTypes/productType/delete/' + productType.productTypeId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProductType(data)
                event.target.reset();
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    // If there are no items but there are products, this function will be called (and will delete products -> product type)
    function deleteProductsAndProductType(event) {
        fetch('products/delete/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productsToDelete)
        }).then(() => {
            fetch('productTypes/productType/delete/' + productType.productTypeId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProductType(data)
                event.target.reset();
            })
                .catch((err) => {
                    console.log(err.message);
                })
        })
    }

    // If there are no items or products associated with the product type, this function will be called (and the product type will be deleted)
    function deleteProductType(event) {
        fetch('productTypes/productType/delete/' + productType.productTypeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            handleDeleteProductType(data)
            event.target.reset();
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <CustomModal
            buttonVariant="danger"
            buttonTitle="Delete"
            action="deleteProductType"
            modalHeading="Are you sure you want to delete this product type? All products of this type will also be deleted, as well as any inventory."
            submitButtonVariant="danger"
            cancelButtonVariant="secondary"
            modalBody={
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control disabled value={productType.name}></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleDeleteProductTypeSubmit}
        >
        </CustomModal>
    );
}