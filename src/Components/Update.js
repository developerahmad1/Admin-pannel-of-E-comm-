import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProductContext from "../Context/Products"; // Import ProductContext

export default function Update() {
  const [name, setName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductContext); // Access fetchProducts from context

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      let result = await fetch(`https://e-comm-server-indol.vercel.app/product/${params.id}`);
      result = await result.json();
      setName(result.name);
      setNewPrice(result.new_price);
      setOldPrice(result.old_price);
      setCategory(result.category);
      setDetails(result.details);
    } catch (err) {
      console.error("Error fetching product details:", err);
      toast.error("Failed to fetch product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData(event.target);
      const response = await fetch(`https://e-comm-server-indol.vercel.app/product/update/${params.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        await fetchProducts(); // Refetch products
        if (category === "men") {
          navigate("/");
        } else if (category === "women") {
          navigate("/womens");
        } else if (category === "kid") {
          navigate("/kids");
        }
      } else {
        const errorText = await response.text();
        console.error("Error updating product:", errorText);
        toast.error("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 style={{ color: "white", fontSize: "40px", marginTop: "150px", marginBottom: "50px" }}>
          Loading.....
        </h1>
      </div>
    );
  }

  return (
    <div className="container1">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container2">
        <form
          encType="multipart/form-data"
          className="container-fluid"
          onSubmit={handleSubmit}
        >
          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              Product Image:
            </label>
            <div className="col-sm-10">
              <input
                className="form-control form-control-lg"
                name="profileImage"
                type="file"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              Product Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter Product Name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              New Price:
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="new_price"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter New Price..."
                required
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              Old Price:
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="old_price"
                className="form-control form-control-lg my-2"
                id="colFormLabelLg"
                placeholder="Enter Old Price..."
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              Select Type:
            </label>
            <div className="col-sm-10">
              <select
                name="category"
                className="form-select form-select-lg mb-3 my-2"
                aria-label="Large select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="men">Mens</option>
                <option value="women">Womens</option>
                <option value="kid">Kids</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2">
              Details:
            </label>
            <div className="col-sm-10">
              <textarea
                name="details"
                className="form-control"
                id="exampleFormControlTextarea1"
                style={{ resize: "none" }}
                rows="3"
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg my-2"></label>
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-outline-info col-sm-12 mt-2 mb-5 w-100"
                style={{ height: "50px", fontSize: "25px" }}
                disabled={updating}
              >
                {updating ? "Updating......" : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
