import React,{useState,useEffect}from 'react'
import AdminNav from './AdminNav'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Table from 'react-bootstrap/Table';
import axios from 'axios'
import env from '../../environment'
import {useNavigate} from 'react-router-dom'

function ProductManagement() {
let [name,setName] = useState("")
let [price,setPrice] = useState("")
let [description,setDescription] = useState("")
let [imageUrl,setImageUrl] = useState("")
let img = "https://via.placeholder.com/150"
let navigate = useNavigate()


let [data,setData] = useState([])


let handleDelete = async (id)=>{
  let token = sessionStorage.getItem('token')
  let res = await axios.post(`${env.apiurl}/delete-product`,
  {
    productId:id
  },
  {
    headers:{"Authorization":`Bearer ${token}`}
  }
  )
  if(res.data.statusCode===200)
  {
    loadData()
  }
}

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
}

let handleSubmit = async ()=>{
  let token = sessionStorage.getItem('token')
  let res = await axios.post(`${env.apiurl}/add-product`,
  {
    name,
    price:Number(price),
    description,
    imageUrl
  },
  {
    headers:{"Authorization":`Bearer ${token}`}
  })

  if(res.data.statusCode===200)
  {
    setName("")
    setPrice("")
    setDescription("")
    setImageUrl("")
    loadData()
  }
  else if(res.data.statusCode===401)
  {
    sessionStorage.clear()
    navigate('/login')
  }
}

useEffect(()=>{
  loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
return  <>
<AdminNav/>
<div> 
    <div className='add-product-wrapper col-4'>
      <h3 >Add your product here!</h3>
    <Form>
    <Form.Group className="mb-3" >
      <Form.Control type="text" value={name} placeholder="product Name" onChange={(e)=>{setName(e.target.value)}}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text" value={price} placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}}/>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Control type="text" value={description} placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}/>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Control type="text" value={imageUrl} placeholder="Image Url" onChange={(e)=>{setImageUrl(e.target.value)}}/>
    </Form.Group>

    <Button variant="primary" onClick={()=>handleSubmit()}>
      Submit
    </Button>
  </Form>

    </div>
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
                <div><Button onClick={()=>handleDelete(e._id)} variant='danger'>Delete</Button></div>
              </div>
            </div>
          })
        }
    </div>
</div>
</>
}

export default ProductManagement