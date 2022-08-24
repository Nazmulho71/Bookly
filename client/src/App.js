import Category from "./components/category";
import "./assets/css/App.css";

function App() {
  return (
    <div className="app">
      <div>
        <h1>Bookly</h1>
        <p>This is a very simple app with crud functionality.</p>

        <Category />
      </div>
    </div>
  );
}

export default App;
