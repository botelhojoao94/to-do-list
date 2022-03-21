import React, { useContext } from "react";
import { Card, Dropdown, Col } from "react-bootstrap";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";
import Item from "./Item";
import DeleteListModal from "./DeleteListModal";
import AppContext from "../context/Context";

function List(props) {

    // App states
    const { items, getData } = useContext(AppContext)

    // Create new task function
    const handleCreateItem = (e, listId) => {
        api
            .post("/data/item", {
                title: "Nova atividade",
                description: "Descrição",
                list_id: listId,
                color: "#EBECF0",
            })
            .then((response) => {
                console.log("New task created");
                getData()
            })
            .catch((error) => {
                console.log("Error");
            });
    };

    // Edit list title function
    const handleEditListTitle = (e, listId) => {
        api
            .put("/data/list", {
                id: listId,
                title: e.value,
            })
            .then((response) => {
                console.log("Title edited");
            })
            .catch((error) => {
                console.log("Error");
            });
    };

    return (
        <Col className="col_list">
            <Card className="list">
                <Card.Body className="overflow-auto">
                    <Card.Title className="d-flex">
                        <EditText
                            defaultValue={props.list.title}
                            onSave={(e) => {
                                handleEditListTitle(e, props.list.id);
                            }}
                        />
                        <Dropdown>
                            <Dropdown.Toggle
                                key="end"
                                variant="none"
                                bsPrefix="none"
                                id="dropdown-basic"
                            >
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <DeleteListModal
                                        list_id={props.list.id}
                                        list_title={props.list.title}
                                    />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Title>

                    {items.map((item, key) => {
                        if (props.list.id === item.list_id)
                            return (
                                <Item
                                    key={key}
                                    item={item}
                                />
                            );
                        return null;
                    })}

                    <Card.Footer className="text-center">
                        <div
                            className="btn text-muted"
                            onClick={(e) => {
                                handleCreateItem(e, props.list.id);
                            }}
                        >
                            + Criar nova atividade
                        </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default List;
