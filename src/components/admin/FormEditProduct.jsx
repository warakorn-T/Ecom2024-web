import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "core i7",
  description: "desc",
  price: 1590,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      //   console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Error fetch data", err);
    }
  };

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          onChange={handleOnChange}
          className="border"
          value={form.title}
          placeholder="Title"
          name="title"
        />
        <input
          onChange={handleOnChange}
          className="border"
          value={form.description}
          placeholder="Description"
          name="description"
        />
        <input
          onChange={handleOnChange}
          className="border"
          type="number"
          value={form.price}
          placeholder="Price"
          name="price"
        />
        <input
          onChange={handleOnChange}
          className="border"
          type="number"
          value={form.quantity}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />

        {/* Upload file */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-green-500 text-white rounded-md p-2">
          แก้ไขสินค้า
        </button>

        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
