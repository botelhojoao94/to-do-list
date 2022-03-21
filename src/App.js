import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import AppProvider from "./context/Provider"

function App() {
    return (
        <div className="App d-flex flex-column">
            <AppProvider>
                <Header />
                <Board />
            </AppProvider>
        </div>
    );
}

export default App;
