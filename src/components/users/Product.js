import React, { useEffect,useState,useContext } from 'react'
import TopBar from './TopBar'
import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
import axios from 'axios'
import env from '../../environment'
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../App';

function Product() {

  let navigate = useNavigate()
  let context = useContext(CartContext);
  let [data,setData] = useState([])
  let img = "https://via.placeholder.com/150"
  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/all-product`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.product)
    }
    else
    {
      navigate('/login')
    }
  }

  let handelAddProduct = async(e)=>{
    let newArray = [...context.cart]
    newArray.push(e)
    context.setCart(newArray)
  }
  useEffect(()=>{
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <>
  <TopBar value={{cart:context.cart}}/>
  <div>
  <div className='list-product-wrapper'>
        <h2>All your Added products are here!</h2>
        {
          data.map((e,i)=>{
            return <div className='card-wrapper ' key={i}>
              <div className='card-image'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-details'>
                <h2>{e.name}</h2>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
                <div>
                  <Button onClick={()=>handelAddProduct(e)} variant='primary'>Add to Cart</Button>
                </div>
              </div>
            </div>
          })
        }
    </div>
  </div>
  </>
}

export default Product