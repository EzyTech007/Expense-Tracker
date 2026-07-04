import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function AddTransaction(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        type:"credit",
        amount: "",
        description:""
    });
    const save = async()=>{
        await api.post("/transactions",form);
        navigate("/")
    }
    return (
        <div>
            <h2> Add Transaction</h2>
            <div>
                <label>Transaction Type</label>
                <br/>
                <select
                value={form.type}
                onChange={(e)=>{
                 setForm({
                    ...form,type:e.target.value
                 })   
                }}
                >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
            </div>
            <br/>
            <div>
                <label>Amount</label>
                <br/>
                <input type="number"
                value={form.amount}
                onChange={(e)=>{
                    setForm({...form,amount:e.target.value})
                }}/>
            </div>
            <br/>
            <div>
                <label>Description</label>
                <br/>
                <input 
                value={form.description}
                onChange={(e)=>{
                    setForm({...form,description:e.target.value})
                }}/>
            </div>
            <br/>
            <button onClick={save}>save</button>
            <button 
            onClick={()=>{navigate("/")}}
            >Cancel</button>
        </div>
    )
}
export default AddTransaction;