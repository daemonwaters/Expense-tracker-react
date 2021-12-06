import React from 'react'
import {FaTrash} from 'react-icons/fa'

function Expense({amount,name,expense,setExpense}) {

    const handleRemove = ()=>{
        let filtered = expense.filter((exp)=> exp.name!== name)
        //iterate through the expense array and filter out the removed expense
        setExpense(filtered)
        //set the new filtered array of expenses to be rendered
    }


    return (
        <div className='expense-row'>
            <h3 className="expense-title">
                {name}
            </h3>
            <h3 className="expense-amount">
                {amount}
            </h3>
            <div onClick={handleRemove} className="remove-expense">
                <FaTrash/>
            </div>
        </div>
    )
}

export default Expense
