import React from 'react'
import { Link } from 'react-router-dom'
export const ConfirmVote = () => {
  return (
    <div style={{width:'70vw', margin:'0 auto',textAlign:'center' ,display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'  }} >
        <h1 style={{color:'rgb(102, 212, 102)'}} >Vote Confirmation</h1>
        <p style={{fontSize:'26px'}} >thank you for voting</p>
        <p style={{fontSize:'26px'}} >your vote has been successfully submmitted</p>
        <Link to='/' style={{background:'rgb(102, 212, 102)'}} >
            <button>Back to home</button>
        </Link>
    </div>
  )
}
