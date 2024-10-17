import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Listing from "./pages/Listing";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/listing" element={<Listing/>} />
        <Route exact={true} path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
