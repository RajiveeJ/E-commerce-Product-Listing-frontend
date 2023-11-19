import React, { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import env from '../../environment'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TopBar from './TopBar'
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../App';
function Cart() {
  let context = useContext(CartContext);
  let img = "https://via.placeholder.com/150"
  let [total,setTotal]=useState(0)
  let [deliveryAddress,setDeliveryAddress] = useState("")
  let [contact,setContact] = useState("")
  let [Cardnumber,setCardnumber] = useState("")
  let [Expiry,setExpiry] = useState("")
  let [CVV,setCvv] = useState("")

  let navigate = useNavigate();

  let removeFromCart =async(i)=>{
    let newArray = [...context.cart]
    newArray.splice(i,1)
    context.setCart(newArray)
  }

  let handleOrder = async ()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.post(`${env.apiurl}/order`,
    {
      orderItems:context.cart,
      deliveryAddress,
      orderAmount:total,
      contact,
      Cardnumber,
      Expiry,
      CVV
    },
    {
      headers:{"Authorization":`Bearer ${token}`}
    })

    if(res.data.statusCode===200)
    {
      context.setCart([])
      navigate('/user-menu')
    }

  }

  useEffect(()=>{
    let sum = 0
    for(var i in context.cart)
    {
        sum += context.cart[i].price
    }
    setTotal(sum)
  },[context.cart])
  return<>
  <TopBar value={{cart:context.cart}}/>
  <div className='add-product-wrapper col-4'>
  <Form>
    <Form.Group className="mb-3" >
      <Form.Control type="text"  placeholder="Delivery Address" onChange={(e)=>setDeliveryAddress(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text"  placeholder="Contact Number" onChange={(e)=>setContact(e.target.value)}/>
    </Form.Group>
  <Form.Group className="mb-3" >
      <Form.Control type="text"  placeholder="Card number" onChange={(e)=>setCardnumber(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text"  placeholder="mm/yy" onChange={(e)=>setExpiry(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control type="text"  placeholder="CVV" onChange={(e)=>setCvv(e.target.value)}/>
    </Form.Group>


    <Button variant="primary" onClick={()=>handleOrder()}>
      Paynow
    </Button>
    </Form>
    </div>
  <div className='list-product-wrapper'>
        <h2>Total Order Value: {total}</h2>
        {
          context.cart.map((e,i)=>{
            return <div className='card-wrapper ' key={i}>
              <div className='card-image'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-details'>
                <h2>{e.name}</h2>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
                <div>
                  <Button onClick={()=>removeFromCart(i)} variant='primary'>Remove</Button>
                </div>
              </div>
            </div>
          })
        }
    </div>
  </>
}

export default Cart
