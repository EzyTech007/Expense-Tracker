import { Routes,Route} from 'react-router-dom';
import Transactions from "./Transactions";
import AddTransaction from "./AddTransactions";

function App(){
    return (
        <Routes>
            <Route path="/" element={<Transactions/>}/>
            <Route path="/add" element={<AddTransaction/>}/>
        </Routes>
    )
}

export default App;