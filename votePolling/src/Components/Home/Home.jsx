import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './home.module.css'
import { getUser } from '../../Api/Auth'
import Cookies from "js-cookie";
const Home = () => {
  const [isAdmin, setisAdmin] = useState()
  const getUserbyid = async () => {
          const id = Cookies.get("userId")
          if(!id) return
          const res = await getUser(id)
          setisAdmin(res?.data?.isAdmin) 
      }
      useEffect(()=>{ 
          getUserbyid()
          
      },[isAdmin,Cookies.get("userId")])
  return (
    <main style={{width:'80vw', margin:'0 auto'}} >
      <h1>WelCome to Online Polling system</h1> 

      <div className={styles.btnBox} >
        {isAdmin?
        <>
        <Link  className={styles.btn} to='/poll' >
            <button>Create Poll</button>
        </Link>
        <Link to='/list' className={styles.btn}  > 
            <button>Poll list</button>
        </Link>
        </>:
        <Link to='/list' className={styles.btn}  > 
            <button>Poll list</button>
        </Link>}
    </div> 
    
    
    </main>
  )
}

export default Home