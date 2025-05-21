import { useState, useEffect } from "react";
import axios from "axios";
export const GetAllProducts = () => {
  //To get state change and set to state variable
  const [productList, setProductList] = useState([]);
  //To get side effects while components is mounting
  useEffect(() => {
    //ToDo Need to uncomment after adding url
    fetchProducts();
  }, []);
  //Fetch products with axios which is external library for request and response.
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8082/products");
      setProductList(response.data);
    } catch (e) {
      console.error("Fetch Product has Issue===>", e);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th> Name </th>
          <th> Price </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {productList.map((item) => {
          return <TbodyComponent key={item.id} item={item} fetchProducts={fetchProducts}/>;
        })}
      </tbody>
    </table>
  );
};

const TbodyComponent = ({ item,fetchProducts }) => {
  const [state, setState] = useState("view");
  const onChangeToEdit = () => {
    setState("edit");
  };
  const onCancel = () => {
    setState("view");
  };
  const onUpdate = async () => {
    
    await axios.put(`http://localhost:8082/products/${item.id}`,{...item});
    onCancel();
    await fetchProducts();
    alert("Document updated Successfully");
  };
  const onDelete = async () => {
    //ToDo uncomment after
   await axios.delete(`http://localhost:8082/products/${item.id}`,{...item});
   onCancel();
    await fetchProducts();
    alert("Document Deleted Successfully");
  };
  const ViewComponent = () => {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>
          <div className="actions-buttons">
            <button onClick={onChangeToEdit}>&#9998;</button>
            <button onClick={onDelete}>&#10060;</button>
          </div>
        </td>
      </tr>
    );
  };
  const EditComponent = () => {
    const onChangePrice = (e) => {
      const val = e.target.value;
      item.price = val;
    };
    const onChangeName = (e) => {
      const val = e.target.value;
      item.name = val;
    };

    return (
      <tr>
        <td>{item.id}</td>
        <td>
          <input type="text" defaultValue={item.name} onChange={onChangeName} />
        </td>
        <td>
          <input
            type="number"
            defaultValue={item.price}
            onChange={onChangePrice}
          />
        </td>
        <td>
          <div className="actions-buttons">
            <button onClick={onUpdate}>&#128190;</button>
            <button onClick={onCancel}>&#10006;</button>
          </div>
        </td>
      </tr>
    );
  };
  return <>{state === "view" ? <ViewComponent /> : <EditComponent />}</>;
};
