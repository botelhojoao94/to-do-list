import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";
import AppContext from "../context/Context";

function DeleteListModal(props) {

    // App states
    const { notify, getData } = useContext(AppContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Delete list function
    const handleDelete = (e) => {
        api // Delete all items from a list
            .delete(
                `https://kanbanboard-back.vercel.app/data/item/fromlist/${e.target.getAttribute(
                    "list_id"
                )}`
            )
            .then((response) => {
                api // Delete the list itself
                    .delete(
                        `https://kanbanboard-back.vercel.app/data/list/${e.target.getAttribute(
                            "list_id"
                        )}`
                    )
                    .then((response) => {
                        console.log("List deleted")
                        notify.deletedList();
                        getData()
                    })
                    .catch((error) => {
                        console.log("Error");
                    });
            })
            .catch((error) => {
                console.log("Error");
            });
        setShow(false);
    };

    return (
        <>
            <div list_id={props.list_id} onClick={handleShow}>
                Excluir
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir lista</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                Tem certeza que deseja excluir a lista "{props.list_title}"? Todas as atividades também serão excluídas!
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        list_id={props.list_id}
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteListModal;
