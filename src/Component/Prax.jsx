import React, { useState } from "react";
import axiosInstance from "../Helper/axiosInstance";

const Prax = () => {
  const token = localStorage.getItem("token");
  const [payload, setPayload] = useState({
    image:null,
  });
  const [path,setPath] = useState([])
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.files[0];
    setPayload({ ...payload, [name]: value });
  };
  const handleSubmit = async (e) => {
    console.log(payload);
    e.preventDefault();
    const res = await axiosInstance.post("/delete", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':"multipart/form-data"
      },
    });
    console.log(res.data.file);
    setPath([...path,`http://localhost:5000/${res.data.file}`]);
  };

  const handle = ()=>{
    console.log(path)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" onChange={handleChange}/>
        <button type="submit"  onDoubleClick={handle}>Upload</button>
      </form>
      {path.map((val)=>{
        return(
        <img src={val} width="200px" height={"200px"}  alt="some" />
        )
      })}
    </div>
  );
};

export default Prax;
