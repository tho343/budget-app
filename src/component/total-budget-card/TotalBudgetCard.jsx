import React from 'react';
import BudgetCard from '../budget-card/budget-card.component';
import { useBudgets} from '../../contexts/BudgetsContext';

export default function TotalBudgetCard() {
    const {expenses,budgets} = useBudgets();
    const amount = expenses.reduce(
        (total,expense) => total + expense.amount, 0 
      )
      const max = budgets.reduce(
        (total,budget) => total +budget.max, 0
      )
      
  return (
    <BudgetCard  name="total" amount={amount} max={max} hide/>
  )
}
