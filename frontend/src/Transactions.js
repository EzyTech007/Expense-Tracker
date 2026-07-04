import { useEffect,useState } from 'react';
import { useNavigate, userNavigate } from 'react-router-dom';
import api from "./api";

function Transactions(){
    const [transactions,setTransactions] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        api.get("/transactions").then((res)=>{
            setTransactions(res.data);
        });
    },[]);
    return (
        <div>
            <h2>Office Transactions</h2>
            <button onClick={()=>navigate("/add")}>Add Transaction</button>
            <br/>
            <br/>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Running Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t)=>(
                        <tr key={t.id}>
                            <td>{new Date(t.created_at).toLocaleDateString()}</td>
                            <td>{t.description}</td>
                            <td>{t.transactions_type==="credit"? t.amount: "-"}</td>
                            <td>{t.transactions_type==="debit"? t.amount: "-"}</td>
                            <td>{t.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Transactions;