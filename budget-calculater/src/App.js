import logo from './logo.svg';
import { useState ,useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid'; /* men rouh mn3mal install la uuid 
hek (npm install uuid)  ba3den 3melna import la uuid ,/ uuid  bt3tene 
random unique ID */
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) { 
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

const initialExpenses=[
  {id:uuidv4(), charge:"rent", amount:1600},
  {id:uuidv4(), charge:"car payment", amount:400},
  {id:uuidv4(), charge:"credit card bill", amount:1200}
];

/*console.log(initialExpenses);*/
function App() {
  const [expenses,setExpenses]=useState(getLocalStorage());
  const [charge,setCharge]=useState('');
  const [amount,setAmount]=useState('');
  const [alert,setAlert]=useState({show:false});
  const [isEditing,setisEditing]=useState(false);
  const [editID,setEditID]=useState(0);


  const handleCharge= e=>{
    setCharge(e.target.value);
};

const handleAmount= e=>{
    setAmount(e.target.value);
 };

 const handleAlert=(({type,text})=>{
  
  setAlert({show:true,type,text});
  setTimeout(() => {
    setAlert({show:false});
  }, 3000);

 })

 const handleSubmit=e=>{
  e.preventDefault();
   if(charge!=0 && amount>0){

    if(isEditing)
    {
      setExpenses(expenses.map((expense)=>{
        return expense.id===editID?{...expense,charge,amount}:expense;
      }))
    setisEditing(false);
    setEditID(null);
    handleAlert({type:'success',text:'item changed'})

    }else{
  const  singleExpenses={id:uuidv4(),charge,amount};
    setExpenses([...expenses,singleExpenses]);
   handleAlert({type:'success',text:'item added'})
    }
     setCharge("");
    setAmount("");
  }  
  else{
      handleAlert({type:'danger',text:'charge can`t be empty value and amount value has not to be less then zero'})

  }
}

const clear=(()=>{
  handleAlert({type:'danger',text:'empty list '})
  setExpenses([]);
})

  const deleteItem=((id)=>{
     handleAlert({type:'danger',text:'Item delteted '})
  setExpenses(expenses.filter((expense)=>expense.id!==id));
    })

  
  const Editing=((id)=>{
    const specificItem=expenses.find((item)=>item.id==id);
    setisEditing(true);
    setEditID(id);
    setCharge(specificItem.charge);
    setAmount(specificItem.amount);
})

useEffect(() => {
    localStorage.setItem('list', JSON.stringify(expenses));
  }, [expenses]);

  
  return (
    <>
    {alert.show &&  <Alert type={alert.type} text={alert.text}/>}
   
    <h1>Budget Calculator</h1>
    <main className='App'>
    <ExpenseForm 
    charge={charge} 
    amount={amount} 
    handleCharge={handleCharge}
    handleAmount={handleAmount}
    handleSubmit={handleSubmit}
    isEditing={isEditing}/> 
    <ExpenseList expenses={expenses} clear={clear} deleteItem={deleteItem} Editing={Editing}/>
    </main>
    <h1>
      Total Spending :<span className='total'>
        ${expenses.reduce((total,current)=>{
          total+=parseInt(current.amount); /* ntebhe bel input ta3oul lamount 7ata
          law ana 7ata ltype number bas hwe bya5od she le bektbo ka string w7ata law hata
          ltype number  so 3shen hek hon 7atyna parseInt */ 
          return total;

},
        0)} </span>
    </h1>
    </>
  );
}

export default App;
