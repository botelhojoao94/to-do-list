import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./List";
import AppContext from "../context/Context";

function Board() {

    // App states
    const { lists, getData } = useContext(AppContext)

    // Called when component is mounted
    useEffect(() => {
        getData()
    }, []);


    return (
        <div className="board d-flex flex-row overflow-auto align-items-center">
            {lists.map((list, key) => {
                return (
                    <List
                        key={key}
                        list={list}
                    />
                );
            })}
            <ToastContainer />
        </div>
    );
}

export default Board;
