const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"transaction_db"
});

db.connect(err=>{
    if(err){
        throw err;
    }
    console.log("Mysql is connected");
});

app.get("/transactions",(req,res)=>{
    db.query("SELECT * FROM transactions ORDER BY created_at ASC",(err,rows)=>{
        if(err){
            console.log(error)
        }
        let balance = 0;
        const data = rows.map(row=>{
            console.log(row.transactions_type,"row.transactions_type")
            if(row.transactions_type === "credit")
                balance += Number(row.amount);
            else
                balance -= Number(row.amount);
            return {
                ...row,
                balance
            };
        });
        res.json(data.reverse());
    });
})
app.post("/transactions",(req,res)=>{
    const {type,amount,description} = req.body;
    db.query("INSERT INTO transactions(transactions_type,amount,description) VALUES(?,?,?)",
        [type,amount,description],
        err=>{
            if(err)
                return res.status(500).json(err);
            res.json({
                message:"Saved"
            });
        }
    )
})
app.listen(5000,()=>{
    console.log("Server is Running");
})