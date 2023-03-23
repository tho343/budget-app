import React from 'react';
import BudgetCard from '../budget-card/budget-card.component';
import { useBudgets,UNCATEGORIZED_BUDGET_ID } from '../../contexts/BudgetsContext';

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total,expense) => total + expense.amount, 0 
      )
      if (amount === 0){return null}
  return (
    <BudgetCard {...props} name="uncategorized" value={UNCATEGORIZED_BUDGET_ID} amount={amount}/>
  )
}
