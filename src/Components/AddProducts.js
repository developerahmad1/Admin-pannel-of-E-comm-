import React, { useState, useEffect } from "react";
import "./AddProducts.css";
import { useAdmin } from "../Context/Admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ImageGallery() {
  const { isLogin } = useAdmin();
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    new_price: "",
    old_price: "",
    category: "men",
    details: "",
  });

  useEffect(() => {
    if (!isLogin) {
      // If not logged in, navigate to the signup page
      navigate("/signup");
    }
  }, [isLogin]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profileImage", formData.profileImage);
    data.append("name", formData.name);
    data.append("new_price", formData.new_price);
    data.append("old_price", formData.old_price);
    data.append("category", formData.category);
    data.append("details", formData.details);

    try {
      const response = await fetch(`https://e-comm-server-indol.vercel.app/product`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // Show success toast and navigate based on category
        toast.success("Product added successfully!");
        const { category } = formData;
        if (category === "men") {
          navigate("/");
        } else if (category === "women") {
          navigate("/womens");
        } else if (category === "kid") {
          navigate("/kids");
        }
      } else {
        // Handle error case
        const errorText = await response.text();
        console.error("Error:", errorText);
        toast.error("Failed to add product. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container1">
      <div className="container2">
        <form onSubmit={handleSubmit} className="container-fluid">
          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              Main Image:
            </label>
            <div className="col-sm-10">
              <div>
                <input
                  className="form-control form-control-lg"
                  name="profileImage"
                  type="file"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              Product Name :
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter Product Name..."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              New Price :
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="new_price"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter New Price..."
                value={formData.new_price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              Old Price :
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="old_price"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter Old Price..."
                value={formData.old_price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              Select Type :
            </label>
            <div className="col-sm-10">
              <select
                name="category"
                className="form-select form-select-lg mb-3 my-2"
                aria-label="Large select example"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="men">Mens</option>
                <option value="women">Womens</option>
                <option value="kid">Kids</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            >
              Details :
            </label>
            <div className="col-sm-10">
              <div className="mb-3">
                <textarea
                  name="details"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  style={{ resize: "none" }}
                  rows="3"
                  value={formData.details}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-sm-2 col-form-label col-form-label-lg my-2"
            ></label>
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-outline-info col-sm-12 mt-2 mb-5 w-100"
                style={{ height: "50px", fontSize: "25px", width: "full" }}
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageGallery;
