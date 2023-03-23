import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import BudgetCard from './component/budget-card/budget-card.component';
import { Fragment } from 'react';
import AddBudgetModal from './component/add-budget-model/AddBudget.component';
import { useBudgets } from './contexts/BudgetsContext';
import AddExpensesModal from './component/add-expenses/AddExpenses.component';
import UncategorizedBudgetCard from './component/uncategory-card/UncategorizedBudgetCard.component';
import TotalBudgetCard from './component/total-budget-card/TotalBudgetCard';
import ViewExpenseModal from './component/view-expense-card/ViewExpenseModal';
import Button from './component/button/Button.component';
function App() {
  //update progress bar
  const {budgets,getBudgetExpenses} = useBudgets();
  //use state to handle add budget modal
  const [showAddBudgetModal,setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
 const [viewExpenseId,setViewExpenseId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  
  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
 
  return (
    
      <Fragment>
      <div className="App">
        <div className='main-btn-container'>
        <Button onClick={()=>setShowAddBudgetModal(true)} name= {"Add Budget"}/>
        <Button onClick={openAddExpenseModal} name="Add Expense"/>
        </div>
      <div className='budget-card-wrapper'>
        
        {
        budgets.map(
          budget =>{
              //calculate the amount from 1 budget
              const amount = getBudgetExpenses(budget.id).reduce(
                (total,expense) => total + expense.amount, 0 
              )
              
             return (<BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} openExpense = {() =>openAddExpenseModal(budget.id)} viewExpense = {()=> setViewExpenseId(budget.id)}/>)

            
          }
        )

      }
      <UncategorizedBudgetCard
      openExpense ={openAddExpenseModal}/>
        <TotalBudgetCard/>
      
      </div>
      <AddBudgetModal show={showAddBudgetModal} handleClose={()=>{setShowAddBudgetModal(false)}}/>
      <AddExpensesModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={
        ()=> setShowAddExpenseModal(false)
      }/>
      <ViewExpenseModal budgetId={viewExpenseId} handleClose={() => setViewExpenseId()}/>
      </div>
      
    </Fragment>
    
    
    
    

  );
}

export default App;
