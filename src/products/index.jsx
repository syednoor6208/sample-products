import { useState } from "react";
// import axios from "axios";
import { GetAllProducts } from "./get-products";
import { AddProduct } from "./add-product";
import "./product.css";

export const Products = () => {
  //ToDo remove pList and add [];
  const [tab, setTab] = useState("get-products");

  //To update tab status
  const onChangeTab = (selectedTab) => (e) => {
    e.preventDefault();
    setTab(selectedTab);
  };

  return (
    <div>
      <ul className="product-nav">
        <li
          className={`nav-items ${tab === "get-products" && "nav-selected"}`}
          onClick={onChangeTab("get-products")}
        >
          <a href="void(0);"> Get Products </a>
        </li>
        <li
          className={`nav-items ${tab === "add-product" && "nav-selected"}`}
          onClick={onChangeTab("add-product")}
        >
          <a href="void(0);"> Add Product</a>
        </li>
      </ul>
      <div className="product-container">
        {tab === "get-products" ? <GetAllProducts /> : <AddProduct />}
      </div>
    </div>
  );
};
