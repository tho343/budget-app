import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { useRef } from 'react';
import "./viewExpenseModal.css";
import { useBudgets } from '../../contexts/BudgetsContext';
import { UNCATEGORIZED_BUDGET_ID } from '../../contexts/BudgetsContext';
import { currencyFormatter } from '../../utils';
export default function ViewExpenseModal({budgetId, handleClose}) {
    
    const {getBudgetExpenses, deleteBudget,deleteExpense,budgets} = useBudgets();
    const expenses = getBudgetExpenses(budgetId);
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID}: budgets.find(b=> b.id === budgetId);
    
  return (

    <Modal className='modal' show={budgetId != null} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
          <Modal.Title>Expenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
          
          <div>{budget?.name}</div>
          {budget !== UNCATEGORIZED_BUDGET_ID && (
            <button onClick={() =>{
              deleteBudget(budget)
              handleClose()
              }}>delete</button>
          )}
          
          {
            expenses.map(e=>{
              return <div>{e.description} {currencyFormatter.format(e.amount)}
                      
                    
                    <button onClick={() => deleteExpense(e)}>
                    delete
                    </button>
                    </div>
            })
          }
          </div>
          </Modal.Body>
       
        </Modal.Dialog>
        
        
        


    </Modal>
  )
}
