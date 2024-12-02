import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../Context/Admin";
import Swal from "sweetalert2";
import ProductContext from "../Context/Products";
import loader from "./images/loader.gif";

export default function ProductList(props) {
  const { isLogin } = useAdmin();
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    if (!isLogin) {
      navigate("/signup");
    }
  }, [isLogin, navigate]);

  const deleteProduct = async (productId) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/product/${productId}`, {
        method: "DELETE",
      });
      await fetchProducts(); // Refetch products
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

  const filteredProducts = products.filter((product) => product.category === props.category);

  return (
    <div id="myBoxesContainer">
      {loading ? (
        <div>
          <h1 style={{ color: "white", fontSize: "40px", marginTop: "50px", marginBottom: "50px" }}>
            Loading........
          </h1>
        </div>
      ) : (
        filteredProducts.map((item) => (
          <div className="product-card" key={item._id}>
            <div className="top-part">
              <div className="image-container">
                <img
                  src={loader}
                  alt="Loading"
                  style={{ scale: "0.4" }}
                />
                <img
                  src={item.image}
                  alt="Product Image"
                  style={{ display: "none" }}
                  onLoad={(e) => {
                    e.target.previousElementSibling.style.display = "none";
                    e.target.style.display = "block";
                  }}
                  onError={(e) => {
                    e.target.previousElementSibling.src = loader;
                    e.target.style.display = "none";
                  }}
                />
              </div>
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
        ))
      )}
    </div>
  );
}
