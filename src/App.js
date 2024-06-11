import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HomePage from "./pages/home/home";
import FoodDetails from "./pages/details/details";
import FavoriteItems from "./pages/favorite/favorites";

function App() {
  return (
    <div>
      <div className="min-h-screen px-6 bg-white text-gray-600 text-lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe-item/:id" element={<FoodDetails />} />
          <Route path="/favorites" element={<FavoriteItems />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
