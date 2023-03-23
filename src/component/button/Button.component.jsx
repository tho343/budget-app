import React from 'react'
import "./Button.styles.css";
export default function Button(props) {
    const {name,onClick,type} = props;
  return (
    <button onClick={onClick} type={type} >{name}</button>
  )
}
