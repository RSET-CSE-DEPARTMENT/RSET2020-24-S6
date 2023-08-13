import React from 'react'

const pstop1 = async(paystop1) => {
    console.log(paystop1)
    try {
      const response = await fetch('http://127.0.0.1:8000/home/selectionfinal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paystop1)
      });
  
      if (response.ok) {
        console.log('Data posted successfully!');
      } else {
        console.error('Error posting data:', response.status);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
}

export default pstop1;