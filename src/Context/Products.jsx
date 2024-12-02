// ProductContext.js
import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API}/product`);
      const data = await response.json();
      setProducts(data.reverse()); // Adjust if needed
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
