import { useEffect, useState } from 'react'
import './App.css'
import image from './assets/my.jpg'
import axios from 'axios'

function App() {
  let [catlist, setCatlist] = useState([])
  let [productlist, setProductlist] = useState([])
  let [categoriesitem, setCategoriesitem] = useState([])

  let getcateogory = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => res.data)
      .then((finalres) => setCatlist(finalres))
  }

  let getproduct = () => {
    axios.get('https://dummyjson.com/products')
      .then((res) => res.data.products)
      .then((finalres) => setProductlist(finalres))
  }

  let clickgar = (val) => {


    axios.get(`https://dummyjson.com/products/category/${val}`)
      .then((res) => res.data.products)
      .then((finalres) => setCategoriesitem(finalres))
  }
  useEffect(() => {
    getcateogory();
    getproduct();

  }, [])

  return (
    <>
      <div className="container">
        {/* Header */}
        <h1 className="heading">E-commerce Store</h1>

        <div className="main-content">
          <div className="category-section">
            <h2>Categories</h2>
            <ul>
              {catlist.map((val, i) => {

                return (
                  <li key={i} onClick={() => { clickgar(val.name) }}>{val.name}</li>
                );
              })}
            </ul>
          </div>


          {/* Product Section */}
          <div className="product-section">
            <div className="product-grid">
              {(categoriesitem.length==0) ?
                productlist.map((val, index) => (
                  <Product val={val} index={index} key={index} />
                )) :
                categoriesitem.map((val, index) => (
                  <Product val={val} index={index} key={index} />))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
function Product({ val, index }) {
  return (
    <div className="product-item">
      <img src={val.images[0]} alt="Product Image" />
      <h3>{val.title}</h3>
      <p>Brand: {val.brand}</p>
      <p className="price">${val.price}</p>
    </div>
  )
}

