import { useState } from "react";
import axios from "axios";
export const AddProduct = () => {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onClickSubmit = async () => {
    await axios.post("", { id, name, price });
    alert("Document added successfully");
  };
  return (
    <div className="add-container">
      <div>
        <label>ID</label>
        <input type="number" value={id} onChange={onChangeId} />
      </div>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={onChangeName} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" onChange={onChangePrice} value={price} />
      </div>
      <button onClick={onClickSubmit}>Add</button>
    </div>
  );
};
