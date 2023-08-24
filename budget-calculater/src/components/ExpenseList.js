import React from 'react'
import Item from './ExpenseItem'
import {MdDelete} from "react-icons/md"

const ExpenseList = ({expenses,clear,deleteItem,Editing}) => {
  
  
  return (
    <>
    <ul className='list'>
        {expenses.map((expense)=>{
            return <Item key={expense.id} expense={expense} deleteItem={deleteItem} Editing={Editing}/>
        })}
    </ul>
    {expenses.length>0 && <button className='btn' onClick={clear} > clear expenses
    <MdDelete className='btn-icon'/>
    </button>}
    
    </>

   
  )
}

export default ExpenseList
