import React, { useEffect, useState } from 'react'
import { CreatePollData } from '../../Api/Poll'
import styles from './CreatePoll.module.css'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../Api/Auth';
const CreatePoll = () => {
    const [PollDate, setPollData] = useState({
        title: "",
        description: "",
        option1: "",
        option2: ""
    })
    const [error, setError] = useState({
        title: "",
        description: "",
        option1: "",
        option2: "",

    })
    const navigate = useNavigate()
    const getUserbyid = async () => {
        const id = Cookies.get("userId")
        const res = await getUser(id)
       
        if(!res?.data?.isAdmin){
            navigate('/')
        }
    }
    useEffect(()=>{ 
        getUserbyid()
        
    },[])

    const HandleChange = (e) => {
        setPollData({
            ...PollDate, [e.target.name]: e.target.value
        })
        
    }
    const HandleError = () => {
        let isError = false;

        let newError = {
            title: "",
            description: "",
            option1: "",
            option2: "",
            };
        if (!PollDate.title) {

            newError.title = 'title is required'
        }

        if (!PollDate.description) {
            newError.description = 'description is required'
        }
        if (!PollDate.option1) {
            newError.option1 = 'option1 is required'

        }
        if (!PollDate.option2) {
            newError.option2 = 'option2 is required'

        }
        setError(newError)
        if (!PollDate.title || !PollDate.description || !PollDate.option1 || !PollDate.option2) {
            isError = true;
        }
        return isError
    }
    const CreatePollhandle = async () => {

        const isError = HandleError();
        if (isError) {
            return;
        }
        const responce = await CreatePollData(PollDate)
        if (responce) {
            toast.success(responce.successMessage, { position: 'top-center' })
            
        }
        setTimeout(() => {
            navigate('/')
          }, 2000);
        setPollData({
            title: "",
            description: "",
            option1: "",
            option2: ""
        })
    }
    return (
        <div className={styles.poll} >
            <ToastContainer />
            <h1>Create New Poll</h1>

            <section className={styles.PollForm} >
                <div className={styles.Form} >
                    <label htmlFor="">Poll Title</label>
                    <div>
                        <input type="text" name='title' value={PollDate.title} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.title}</p>

                    </div>
                </div>
                <div className={styles.Form} >
                    <label htmlFor="">Description</label>
                    <div>
                        <textarea type="text" name="description" value={PollDate.description} style={{ height: "100px" }} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.description}</p>
                    </div>
                </div>
                <div className={styles.Form} >
                    <label htmlFor="">Option1</label>
                    <div>
                        <input type="text" name='option1' value={PollDate.option1} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.option1}</p>
                    </div>
                </div>
                <div className={styles.Form} >
                    <label htmlFor="">Option2</label>
                    <div>
                        <input type="text" name='option2' value={PollDate.option2} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.option2}</p>
                    </div>
                </div>
            </section>
            <div className={styles.btn} onClick={CreatePollhandle} >
                <button>Create Poll</button>
            </div>
        </div>
    )
}

export default CreatePoll