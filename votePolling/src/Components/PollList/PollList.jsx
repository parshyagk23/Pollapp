import React, { useEffect, useState } from 'react'
import { DeletePollById, GetAllPollList } from '../../Api/Poll'
import styles from './Pollist.module.css'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify'
import { getUser } from '../../Api/Auth';
const PollList = () => {

  const [PollList, setPollList] = useState();
  const [isAdmin, setisAdmin] = useState()
  const getLists  = async () =>{
    try {
      const responce =  await GetAllPollList();
      if(responce) setPollList(responce?.data)
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect( () => {
    getLists()
    
  },[])
    const getUserbyid = async () => {
            const id = Cookies.get("userId")
            if(!id) return
            const res = await getUser(id)
            setisAdmin(res?.data?.isAdmin) 
        }
        useEffect(()=>{ 
            getUserbyid()
            
        },[isAdmin,Cookies.get("userId")])
  const HandleDeletePoll = async (id)=>{
    const res = await DeletePollById(id)
    if(res?.successMessage) {
      toast.success("Poll deleted successfully",{position:'top-center'})
      getLists()
    }
  }
  return (
    <div className={styles.list} >
      <ToastContainer />
        <h1>Poll list</h1>
        {PollList?
          PollList?.map((val,i)=>(
            <div key={i} className={styles.lists} >
              <div style={{textAlign:'left'}} >
                <h4>{val.title}</h4>
                < p style={{fontSize:'20px'}} > <span style={{fontWeight:"bold"}} >Description: </span> {val.description }</p>
              </div>
              {!isAdmin?<Link  to={`/poll/${val._id}`} >
                <button>Vote</button>
              </Link>:
              <div className={styles.link} onClick={()=>HandleDeletePoll(val._id)}  >
                <button>Delete</button>
              </div>}
            </div>
          ))
          :
          <div className={styles.NoPoll} >
            <h2 style={{textAlign:'center', margin:'20px 0'}} >No Polls Created</h2>
            <Link to='/' >
            <button>Back to home</button>
            </Link>
          </div>
        }
      
        
      
    </div>
  )
}

export default PollList