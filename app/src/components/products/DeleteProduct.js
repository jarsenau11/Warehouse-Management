/**
 * Component used for deleting products
 *      - Renders a CustomModal component, and a form inside of the CustomModal
 *      - Handles delete requests for products; which request is sent will depend on whether or not there are dependencies that need to be addressed (i.e. if there are items that exist for the given product)
 */


import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CustomModal from "../Modal";

/**
 * @param handleDeleteProduct - function to handle re-rendering of data after sending http request
 * @param product - product to be deleted
 * @param itemsToDelete (optional) - items associated with the product (which will be deleted) if there are any
 */
export default function DeleteProduct({ handleDeleteProduct, product, itemsToDelete }) {

    // Function called on submit of the modal which will determine which request should be made
    //      if there are no items, delete the product, otherwise delete the items then the product
    function handleDeleteProductSubmit(event) {
        if (itemsToDelete == null || itemsToDelete == undefined || itemsToDelete.length == 0) {
            deleteProduct(event)
        }
        else {
            deleteItemsAndProduct(event)
        }
    }

    // Sends a request to delete all items associated with the product, then send a request to delete the product
    function deleteItemsAndProduct(event) {
        fetch('items/delete/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemsToDelete)
        }).then(() => {
            fetch('products/product/delete/' + product.productId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((data) => {
                handleDeleteProduct(data)
                event.target.reset();
            }).catch((err) => {
                console.log(err.message);
            })
        })
    }

    // Send a request to delete the product
    function deleteProduct(event) {
        fetch('products/product/delete/' + product.productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            handleDeleteProduct(data)
            event.target.reset();
        }).catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <CustomModal
            buttonVariant="danger"
            buttonTitle="Delete"
            action="deleteProduct"
            modalHeading="Are you sure you want to delete this product? All inventory for this product will also be deleted."
            submitButtonVariant="danger"
            cancelButtonVariant="secondary"
            modalBody={
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled value={product.name}></Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            }
            handleSubmit={handleDeleteProductSubmit}
        >
        </CustomModal>
    );
}