
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then((res) => setData(res?.data?.products))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);


  const filteredMobileProducts = Object.values(data).filter(product => product?.subcategory === 'mobile');
  const sortedMobileProducts = filteredMobileProducts.sort((a, b) => parseInt(b?.price) - parseInt(a?.price));

  return (
    <div className="App">
      <h1>Filtered and Sorted Mobile Products</h1>
    <div style={{display:'flex',flexWrap:"wrap",gap:"1rem",justifyContent:"center"}}>
      {sortedMobileProducts.map((product, index) => (
        <div key={index} style={{display:"flex",justifyContent:"center",
        flexWrap:"wrap",border:"1px solid black", backgroundColor:"whitesmoke",padding:"1rem",
        flexDirection:'row',width:"25%"}}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <p> Title: {product?.title}</p>
          <p>Price: {product?.price}</p>
          <p>Popularity: {product?.popularity}
          </p>
          </div> </div>
      ))}

    </div>
    </div>
  );
}

export default App;
