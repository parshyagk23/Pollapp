import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { GetPollListById } from '../../Api/Poll'
import styles from './PollDetails.module.css'
import { ToastContainer,toast } from 'react-toastify'
const PollDtails = () => {

    const {id} = useParams()
    const [PollData,setPollData] = useState()
    const [option1,setOption1] = useState(false);
    const [option2,setOption2] = useState(false);
    const navigate = useNavigate()
    const getById = async()=>{
      const responce = await GetPollListById(id)
      setPollData(responce)
    }

    useEffect(()=>{
      getById()
    },[])

    const HandleSubmit =()=>{
      if(!option1 && !option2){
        toast.error("Please select an option", { position: 'top-center' })
        return
      }
      setOption1(false)
      setOption2(false)
      navigate('/confirm')
    }
  return (
    <div className={styles.Details} >
      <ToastContainer/>
      <h1>Poll Details</h1>
      
        {PollData?<div className={styles.pollData} >
          <h3>{PollData?.PollDetails?.title}</h3>
          <p>{PollData?.PollDetails?.description}</p>
          <div>
          <input type="radio" name="" id="" 
          onChange={()=>{
            setOption1(true)
            setOption2(false)
          }} 
          checked={option1}
          />
          <p>{PollData?.PollDetails?.option1}</p>
          </div>
          <div>
          <input type="radio" name="" id=""
          
          onChange={()=>{
            setOption2(true)
            setOption1(false)
          }} 
          checked={option2}/>
          <p>{PollData?.PollDetails?.option2}</p>
          </div>
          <div className={styles.btn}  onClick={HandleSubmit} >
            <button>Submit Vote</button>
          </div>
        </div>:<h1>Details not Found</h1>}
    
    </div>
  )
}

export default PollDtails