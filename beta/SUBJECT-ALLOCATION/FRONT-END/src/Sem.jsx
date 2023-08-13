import React from 'react'

const Sem = async(selectedOption) => {
  let x=selectedOption;
    try {
      const response = await fetch('http://127.0.0.1:8000/home/semtype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({sem : selectedOption})
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

export default Sem