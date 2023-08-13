import React from 'react'

const Split = async (pay1) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/home/split', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pay1)
    });

    if (response.ok) {
      console.log('Data posted successfully!');
    } else {
      console.error('Error posting data:', response.status);
    }
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export default Split;