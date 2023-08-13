import React from 'react'

const Ps1 = async(payload1) => {
  console.log(payload1)
  try {
    const response = await fetch('http://127.0.0.1:8000/home/phase1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload1)
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

export default Ps1;