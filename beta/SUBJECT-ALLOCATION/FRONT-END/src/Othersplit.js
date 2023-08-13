import React from 'react'

const Othersplit = async (pay2) => {

  console.log(pay2)
  try {
    const response = await fetch('http://127.0.0.1:8000/home/othersplit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pay2)
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

export default Othersplit