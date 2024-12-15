import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct(20);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (window.confirm("You want to Delete")) {
      try {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success(`Delete success`);
        getProduct();
      } catch (err) {
        console.log(err);
      }
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

        <button className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200">
          เพิ่มสินค้า
        </button>

        <hr />
        <br />

        <table className="table w-full border ">
          <thead>
            <tr className="bg-gray-200 border">
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-md shadow-sm flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{numberFormat(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{dateFormat(item.updatedAt)}</td>
                  <td className="flex gap-2">
                    <p className="bg-yellow-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200">
                      <Link to={"/admin/product/" + item.id}>
                        <Pencil />
                      </Link>
                    </p>
                    <p
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                      <Trash2 />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
