import React from 'react';
import { currencyFormatter } from '../../utils';
import {HiViewList,HiDocumentAdd} from 'react-icons/hi';
import ProgressBar from '../progress-bar/progress-bar.component';
import "./budget-card.styles.css";
export default function BudgetCard({name,amount, max,openExpense,hideButton,viewExpense}) {
    const formatedAmount = currencyFormatter.format(amount);
    const formatedMax = currencyFormatter.format(max);
  return (
    <div className='budget-item-container'>
        <div className='budget-item-top-elements'>
        <div className='budget-item-name'><h3>{name}</h3></div>
        {!hideButton &&(
          <div>
            <button onClick={openExpense} className="icon"><HiDocumentAdd size="20"/></button>
            <button onClick={viewExpense} className="icon"><HiViewList size="20"/></button>
          </div>
          
        )}
       
        
        </div>
        
        <div className='budget-item-bottom-elements'>
        
        {max && <ProgressBar amount={amount} max={max}/>}
        <div>{formatedAmount} {max && <span>/{formatedMax}</span>}</div>
        </div>
        
    </div>
  )
}
