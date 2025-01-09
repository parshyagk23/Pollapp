import React, { useEffect, useState } from 'react'
import { CreatePollData } from '../../Api/Poll'
import styles from './CreatePoll.module.css'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../Api/Auth';
const CreatePoll = () => {
    const [PollData, setPollData] = useState({
        title: "",
        description: "",
        option: ["", ""],

        
    })
    const [error, setError] = useState({
        title: "",
        description: "",
        option: []

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
            ...PollData, [e.target.name]: e.target.value
        })
        
    }
    const HandleOptionChange = (e) => {
        const Newoptions = PollData.option;
       
        Newoptions[e.target.name]= e.target.value
        setPollData({
            ...PollData, option:Newoptions

        })
        
    }
    const HandleError = () => {
        let isError = false;

        let newError = {
            title: "",
            description: "",
            option: ["",""],
            };
        if (!PollData.title) {

            newError.title = 'title is required'
        }

        if (!PollData.description) {
            newError.description = 'description is required'
        }
        let OptionError = false
        PollData?.option?.map((item,index)=>{
            if(!item){
                if(index===0){newError.option[index]='option is required'}
                else if(index===1) {newError.option[index]='option is required'}
                else{newError?.option.push( 'option is required'); }
            OptionError=true
        }
        })
        
        setError(newError)
        if (!PollData.title || !PollData.description ||OptionError) {
            isError = true;
        }
        return isError
    }
    const CreatePollhandle = async () => {

        const isError = HandleError();
        if (isError) {
            return;
        }
        const responce = await CreatePollData(PollData)
        if (responce) {
            toast.success(responce.successMessage, { position: 'top-center' })
            
        }
        setTimeout(() => {
            navigate('/')
          }, 2000);
        setPollData({
            title: "",
            description: "",
            option: []
        })
    }
    const HandleAddOption = ()=>{
        const newOption = PollData.option
        newOption.push("")   
        setPollData({
            ...PollData, option: newOption
        })
    }
    const HandleRemoveOption = ()=>{
        const newOption = PollData.option
        newOption.pop("")   
        setPollData({
            ...PollData, option: newOption
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
                        <input type="text" name='title' value={PollData.title} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.title}</p>

                    </div>
                </div>
                <div className={styles.Form} >
                    <label htmlFor="">Description</label>
                    <div>
                        <textarea type="text" name="description" value={PollData.description} style={{ height: "100px" }} onChange={(e) => HandleChange(e)} required />
                        <p style={{ color: 'red' }} >{error.description}</p>
                    </div>
                </div>
                {PollData?.option.map((item,index)=>
                (
                    <div key={index} className={styles.Form} >
                    <label htmlFor="">Option{index+1}</label>
                    <div>
                        <input type="text" name={index} value={item} onChange={(e) =>HandleOptionChange(e)} required />
                        <p style={{ color: 'red' }} >{error.option[index]}</p>
                    </div>
                </div>
                )
                    
                )}
                <div style={{ width:'330px', margin:'0 auto', display:'flex', gap:'10px'}} >
                {PollData.option.length<6 &&
                <div className={styles.add}  onClick={HandleAddOption}>
                <button>
                    Add Option +
                </button>
            </div>}
                {PollData.option.length>2 && <div className={styles.add} onClick={HandleRemoveOption} >
                    <button>
                        Remove Option -
                    </button>
                </div>}
                </div>
               
            </section>
            <div className={styles.btn} onClick={CreatePollhandle} >
                <button>Create Poll</button>
            </div>
        </div>
    )
}

export default CreatePoll