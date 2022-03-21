import React, { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { api } from "../services/api";
import logo from "../assets/images/logo.png";
import AppContext from "../context/Context";

function Header() {

    const { getData } = useContext(AppContext)

    // Create new list function
    const handleCreateList = () => {
        api
            .post("/data/list", {
                title: "New List",
            })
            .then((response) => {
                console.log("New list created");
                getData()
            })
            .catch((error) => {
                console.log("Error");
            });
    };

    return (
        <Navbar className="page_top">
            <Container fluid>
                <Navbar.Brand>
                    <img alt="kanban" src={logo} width="130px" />
                </Navbar.Brand>
                <Button
                    onClick={() => {
                        handleCreateList();
                    }}
                    variant="outline-success"
                >
                    + Create list
                </Button>
            </Container>
        </Navbar>
    );
}

export default Header;
