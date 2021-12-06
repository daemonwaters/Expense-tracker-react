import { useEffect, useRef, useState } from "react";
import { FaBalanceScale, FaCreditCard, FaDollarSign } from "react-icons/fa";
import "./App.css";
import Expense from "./Expense";

function App() {
  const [input, setInput] = useState(0);
  const [budget, setBudget] = useState(0);
  const [expenseInput, setExpenseInput] = useState({ name: "", amount: 0 });
  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const budgetRef = useRef();
  const expenseNameRef = useRef();
  const expenseAmountRef = useRef();

  const handleInput = (e) => {
    setInput(parseInt(e.target.value));
    //used to keep track of input's changing value and store it as a number
  };

  const handleBudget = () => {
    if (!budgetRef.current.checkValidity()) {
      alert("The budget valude must be greater than zero");
      setInput(0);
      return;
      //check if the input's value is greater than 0
      // if not alert and stop the function
    }
    setBudget(input);
    setInput(0);
  };

  const handleExpense = () => {
    if (!expenseInput.name.length > 0 || expenseInput.amount <= 0) {
      alert("Please fill out all expense inputs");
      setExpenseInput({ name: "", amount: 0 });
      return;
      //check if the expense info is valid
    }

    if(expense.some((item)=> item.name.toLowerCase() === expenseInput.name.toLocaleLowerCase())){
      alert('the expense you are trying to add already exists')
      return;
    }

    setExpense([...expense, expenseInput]);

    setExpenseInput({ name: "", amount: 0 });
  };

  useEffect(() => {
    setBalance(budget - totalExpense);
    //update the balance every time either total expense or budget changes
  }, [totalExpense, budget]);

  useEffect(()=>{

    let sum = expense.reduce((total, item) => {
        total += item.amount;
        console.log(total)
        return total;
    },0);
    setTotalExpense(parseInt(sum))

  },[expense])



  return (
    <div className="wrapper">
      <div className="forms">
        <div className="budget">
          <label htmlFor="budgetInput">Please enter your budget</label>
          <input
            ref={budgetRef}
            onChange={handleInput}
            value={input}
            type="number"
            min="0"
            placeholder="Budget..."
          />
          <button onClick={handleBudget}>Calculate</button>
        </div>

        <div className="expense">
          <label htmlFor="expenseName">please enter your expense</label>
          <input
            ref={expenseNameRef}
            onChange={(e) =>
              setExpenseInput({
                ...expenseInput,
                name: e.target.value,
              })
            }
            value={expenseInput.name}
            type="text"
            placeholder="Expense Name..."
          />
          <label htmlFor="expense">please enter your expense amount</label>
          <input
            ref={expenseAmountRef}
            onChange={(e) =>
              setExpenseInput({
                ...expenseInput,
                amount: parseInt(e.target.value),
              })
            }
            value={expenseInput.amount}
            type="number"
            placeholder="Expense amount..."
          />
          <button onClick={handleExpense}>Add expense</button>
        </div>
      </div>

      <div className="preview">
        <div className="header">
          <div className="icon">
            <h3>Budget</h3>
            <div className="logo">
              <FaDollarSign/>
            </div>
            <p id='budgetText'> ${budget}</p>
          </div>
          <div className="icon">
            <h3>Expense</h3>
            <div className="logo">
              <FaCreditCard/>
            </div>
            <p id='expenseText'>${totalExpense}</p>
          </div>
          <div className="icon">
            <h3>Balance</h3>
            <div className="logo">
              <FaBalanceScale/>
            </div>
            <p>${balance}</p>
          </div>
        </div>
        <div className="cart">
          <div className="titles">
            <h3>Expense title</h3>
            <h3>expense value</h3>
          </div>
          {expense.map((exp,index)=>{
              return (
                  <Expense key={index} amount={exp.amount} name={exp.name} expense={expense} setExpense={setExpense} />
              )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
