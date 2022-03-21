import React, { useState } from 'react';
import AppContext from './Context';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";

const AppProvider = ({ children }) => {

    const [lists, setLists] = useState([])
    const [items, setItems] = useState([])

    // Notification (toast)
    const notify = {
        deletedList: function () {
            toast.success("List successfully deleted!", {
                autoClose: 3000,
                hideProgressBar: true,
            });
        },
        deletedItem: function () {
            toast.success("Task successfully deleted", {
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };

    const getData = () => {
        // Get all lists
        api
            .get("/data/lists")
            .then((response) => {
                setLists(response.data.dados);
            })
            .catch((error) => {
                console.log("Error");
            });
        // Get all items
        api
            .get("/data/items")
            .then((response) => {
                setItems(response.data.dados);
            })
            .catch((error) => {
                console.log("Error");
            });
    }

    return (
        <AppContext.Provider value={{ lists, setLists, items, setItems, notify, getData }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider