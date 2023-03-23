import React from 'react';
import {v4 as uuidV4} from 'uuid';
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useBudgets } from '../../contexts/BudgetsContext';
import Button from '../button/Button.component';

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef();
    const numberRef = useRef();
    const {addBudget} = useBudgets();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        addBudget(
            {
                id:uuidV4(),
                name:nameRef.current.value,
                max : parseFloat(numberRef.current.value)
            }
        )
        
        handleClose();
    }
  return (
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" required ref={nameRef}></input>
            <label>Maximum spending</label>
            <input type="number" required min={0} step={0.01} ref={numberRef}></input>
            <Button type="submit" name="Submit"/>
        </form>

    </Modal>
  )
}
