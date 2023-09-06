import "../styles/Admin.css";
import { useState,useRef} from "react";
import Topbar from "../components/Topbar";
import { FcPlus } from "react-icons/fc";
import {api} from "../api"

function Admin() {
  const upNameField=useRef(null);
  const upCatField=useRef(null);
  const upImageField=useRef(null);
  const upPriceField=useRef(null);
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        }
      ];
    });
  };
  let loginflag = localStorage.getItem("isLoggedIn");
  let curr_user;
  if (loginflag === "true") {
    curr_user = localStorage.getItem("loggedUser");
  }
  async function handleSubmit(e){
    e.preventDefault();
    let  name=upNameField.current.value;  
    let  image=upImageField.current.value; 
    let  category=upCatField.current.value;
    let price=upPriceField.current.value;
    let highlightArr=[];
    var x;
    for(x=0;x<arr.length;x++){
      highlightArr.push(arr[x].value);
    }
    console.log(highlightArr);
    let data={
      name: name,
      highlights:highlightArr,
      category: category,
      price:price,
      img: image,
      featured:false,
      rating:[],
      reviews:[]
    }    
    try{
    let response=await api.post("/product",data);
    if(response.status===200){
      alert(`${name} uploaded successfully!`);
    }
  }
  catch(err){
    console.log(err);
  }

  };
  const handleHighlightsChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  return (
    <div className="up-form">
      {curr_user === "admin" && (
        <div>
          <Topbar />
          <h1>Upload new products here!</h1>
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="up-div">
              <label htmlFor="name" className="up-form-lb">
                Name
              </label>
              <input type="text" id="name" className="up-form-ip" ref={upNameField}></input>
            </div>
            <div className="up-div">
              <label htmlFor="category" className="up-form-lb">
                Category
              </label>
              <input type="text" id="category" className="up-form-ip"ref={upCatField}></input>
            </div>
            <div className="up-div">
              <label htmlFor="image" className="up-form-lb">
                Image
              </label>
              <input type="text" id="image" className="up-form-ip"ref={upImageField}></input>
            </div>
            <div className="up-div">
              <label htmlFor="price" className="up-form-lb">
                Price
              </label>
              <input type="text" id="price" className="up-form-ip"ref={upPriceField}></input>
            </div>
            <div className=" up-lb-hlt">
              <label htmlFor="highlights" className="up-form-lb up-form-hlt-lb">
                Highlights
              </label>
            </div>
            <div className="up-highlights-div">
              {arr.map((item, i) => {
                return (
                  <input
                    onChange={handleHighlightsChange}
                    value={item.value}
                    id={i}
                    type={item.type}
                    className="up-form-ip up-hlt-ip"
                  />
                );
              })}
            </div>
            <button type="submit" className="primary-btn up-form-btn">
              Upload product
            </button>
          </form>
          <FcPlus
            className="more-highlights-btn"
            size="30"
            onClick={addInput}
          />
        </div>
      )}
      {curr_user !== "admin" && <div>Not an admin!</div>}
    </div>
  );
}

export default Admin;
