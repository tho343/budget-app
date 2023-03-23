import React from 'react'
import "./progress-bar.styles.css"

export default function ProgressBar(props) {
    const {amount,max} = props;
    const progressBarVariant = (amount, max)=>{
        const percentage = amount/max;
        if(percentage < 0.5){
          return {
            status: "safe",
            width: percentage
          }
        }
        else if(percentage <0.8){
          return {
            status: "alert",
            width: percentage
          }
        } return {
          status: "danger",
          width: percentage
        }
      }
      let {status,width} = progressBarVariant(amount,max);
      width = Math.floor(width * 100);
      console.log(status,width);
  return (
  
    <div className='progress-container'>
        <div className={`progress-bar ${status}`} style={{width: `${width}%`}} >

          </div>
        
    </div>
  )
}
