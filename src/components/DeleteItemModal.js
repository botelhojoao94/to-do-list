import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";
import AppContext from "../context/Context";

function DeleteItemModal(props) {
    const { notify, getData } = useContext(AppContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Delete item function
    const handleDelete = (e) => {
        api
            .delete(
                `/data/item/${e.target.getAttribute(
                    "item_id"
                )}`
            )
            .then((response) => {
                console.log("Task deleted")
                notify.deletedItem();
                getData()
            })
            .catch((error) => {
                console.log("Error");
            });
        setShow(false);
    };

    return (
        <>
            <div item_id={props.item_id} onClick={handleShow}>
                Delete
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete the task "{props.item_title}"?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        item_id={props.item_id}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteItemModal;
