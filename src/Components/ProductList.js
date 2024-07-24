import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../Context/Admin";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function ProductList(props) {
  const { isLogin } = useAdmin();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/signup");
    } else {
      getProducts();
    }
  }, [isLogin, navigate]);

  const getProducts = async () => {
    try {
      let result = await fetch(`${process.env.REACT_APP_API}/product`);
      result = await result.json();
      result = result.reverse();
      result = result.filter((product) => product.category === props.category);
      console.log("All Products : ", result);
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/product/${productId}`, {
        method: "DELETE",
      });
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId); // Call deleteProduct if the user confirms
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  return (
    <div id="myBoxesContainer">
      {products.map((item) => (
        <div className="product-card" key={item._id}>
          <div className="top-part">
            <img src={item.image} alt="Product Image" />
          </div>
          <div className="bottom-part">
            <div className="product-name">{item.name}</div>
            <div className="category">
              Price: <p>$ {item.new_price}</p>{" "}
              <p className="old_Price">${item.old_price}</p>
            </div>
            <div className="buttons">
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(item._id)}
              >
                Delete
              </button>
              <Link to={`/update/${item._id}`}>
                <button className="update-button">Update</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
