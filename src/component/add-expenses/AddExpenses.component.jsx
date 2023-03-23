import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { useRef } from 'react';
import { useBudgets } from '../../contexts/BudgetsContext';
import { UNCATEGORIZED_BUDGET_ID } from '../../contexts/BudgetsContext';
export default function AddExpensesModal({defaultBudgetId,show, handleClose}) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const {addExpense,budgets} = useBudgets();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        addExpense(
            {
                description:descriptionRef.current.value,
                amount : parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
            }
        )
        handleClose();
    }
  return (

    <Modal show={show} onHide={handleClose}>AddExpensesModal
        <form onSubmit={handleSubmit}>
            <label>Description</label>
            <input type="text" required ref={descriptionRef}></input>
            <label>Amount</label>
            <input type="number" required min={0} step={0.01} ref={amountRef}></input>
            <button type="submit">Submit</button>
            <label for="budget">Budget</label>
            <select ref={budgetIdRef} defaultValue={defaultBudgetId}>
                <option key={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                {budgets.map(budget=> {
                    return <option key={budget.id} value={budget.id}>{budget.name}</option>
                }
                    )}
            </select>
        </form>

    </Modal>
  )
}
