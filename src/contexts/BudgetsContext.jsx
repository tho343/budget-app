import { useState, createContext } from "react";
import { useContext } from "react";
import {v4 as uuidV4} from 'uuid';
import useLocalStorage from "../hook/localStorage";
export const  UNCATEGORIZED_BUDGET_ID = "Uncategorized";
const BudgetsContext = createContext();
export function useBudgets(){
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) =>{
    // budget = {
//     id:
//     name:
//     max:
// }

// expense ={
//     id:
//     budgetId:
//     amount:
//     description:
// }
const [budgets,setBudgets] = useLocalStorage("budgets",[]);
const [expenses,setExpenses] = useLocalStorage("expense",[]);
//view the expenses for the supplied category
const getBudgetExpenses = (budgetId) =>{
    return expenses.filter(expense => {
       return expense.budgetId === budgetId;
    })
}
//add an expense
 const addExpense = ({budgetId,amount,description}) =>{
    setExpenses(prevExpenses => {
        return [...prevExpenses,
            {
                id: uuidV4(),
                budgetId: budgetId,
                amount:amount,
                description: description
            }]
    })
 }
//add a budget
const addBudget = ({id,name,max}) =>{
    setBudgets(prevBudgets=>{
        //if the budget replicate, return the previous budget
        if(prevBudgets.find(budget => budget.name === name)){
            return prevBudgets;
        }
        return [...prevBudgets,
        {
            id : id,
            name: name,
            max: max
        }]
    })
}
//delete a budget
const deleteBudget =({id})=>{
    setExpenses(prevExpenses => {
        return prevExpenses.map(expense => {
            if(expense.budgetId !== id) return expense
            return {...expense,budgetId: UNCATEGORIZED_BUDGET_ID};
        })
    })
    setBudgets(prevBudgets=> {
        return prevBudgets.filter(budget => budget.id !== id);
    })
}
//delete an expense
const deleteExpense = ({id}) =>{
    setExpenses(prevExpenses=> {
        return prevExpenses.filter(expense => expense.id !== id);
    })
}
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}