import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import env from '../../environment'
import {useNavigate} from 'react-router-dom'

function Dashboard() {

  let [data,setData] = useState([])
  let navigate = useNavigate()

  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/orders`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.orders)
    }
    else{
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
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Order Amount</th>
          <th>Contact</th>
          <th>Delivery Address</th>
          <th>Status</th>
          <th>Ordered At</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i)=>{

            return <tr  key={i} onClick={()=>navigate(`/dashboard/${e._id}`)}>              
                <td>{i+1}</td>
                <td>&#8377; {e.orderAmount}</td>
                <td>{e.contact}</td>
                <td>{e.deliveryAddress}</td>
                <td>{e.status}</td>
                <td>{e.orderedAt}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
  </div>
  </>
}

export default Dashboard