import React from 'react';

const NotFound = () => {
    
    console.log("Error")
  return (
    <div className='container' style={{textAlign: 'center',color:'red', margin:'5%',fontSize: "1.5rem"}}>
      <h1 >404 Not Found</h1>
      <p >Sorry, the page you're looking for does not exist.</p>
    </div>
  )
}

export default NotFound;
