import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import PrivateComponennt from './Components/PrivateComponennt';
import Login from './Components/Login';
import AddProducts from './Components/AddProducts';
import ProductList from './Components/ProductList';
import Update from './Components/Update';
import Footer from './Components/Footer/Footer';
import Nopage from './Components/Nopage';

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponennt />}>
            <Route path="/" element={<ProductList category="men" />} />
            <Route path="/womens" element={<ProductList category="women" />} />
            <Route path="/kids" element={<ProductList category="kid" />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<Update />} />
            {/* <Route path="/logout" element={<h1>Logout Component</h1>} /> */}
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <Footer />
        {visible && (
          <div
            onClick={scrollToTop}
            className='scrollToTop'
          >
            <FaArrowAltCircleUp size={30} color="#f1dac4" />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
