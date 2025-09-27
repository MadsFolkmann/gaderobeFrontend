import './App.css'
import { NavBar } from './Components/NavBar';
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/Home";
import Wardrobe from "./pages/MyWardobe";
import AddClothing from "./pages/AddClothing";
// import TryOn from "./pages/TryOn";

function App() {

return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="wardrobe" element={<Wardrobe />} />
        <Route path="add" element={<AddClothing />} />
        {/* <Route path="try-on" element={<TryOn />} /> */}
      </Route>
    </Routes>
  );
}

export default App
