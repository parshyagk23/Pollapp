import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetPollListById } from '../../Api/Poll'
import styles from './PollDetails.module.css'
import { ToastContainer, toast } from 'react-toastify'
const PollDtails = () => {

  const { id } = useParams()
  const [PollData, setPollData] = useState()
  const [optionIndex, setOptionIndex] = useState();
  const navigate = useNavigate()
  const getById = async () => {
    const responce = await GetPollListById(id)
    setPollData(responce)
  }

  useEffect(() => {
    getById()
  }, [])

  const HandleSubmit = () => {
    if (optionIndex===undefined) {
      toast.error("Please select an option", { position: 'top-center' })
      return
    }
    setOptionIndex()
    navigate('/confirm')
  }
  
  return (
    <div className={styles.Details} >
      <ToastContainer />
      <h1>Poll Details</h1>

      {PollData ? <div className={styles.pollData} >
        <h3>{PollData?.PollDetails?.title}</h3>
        <p>{PollData?.PollDetails?.description}</p>
        {PollData?.PollDetails?.option?.map((item,index)=>(
          <div key={index} >
          <input type="radio" name="" id=""
           onChange={()=>setOptionIndex(index)}
            checked={optionIndex===index}
          />
          <p>{item}</p>
        </div>
        ))}
        
        <div className={styles.btn} onClick={HandleSubmit} >
          <button>Submit Vote</button>
        </div>
      </div> : <h1>Details not Found</h1>}

    </div>
  )
}

export default PollDtails