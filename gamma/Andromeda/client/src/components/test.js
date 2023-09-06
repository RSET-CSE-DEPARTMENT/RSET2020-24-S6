const axios = require("axios");

async function getData() {
    const options = {
      method: 'POST',
      url: 'https://openai80.p.rapidapi.com/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '68ab718cb8msh84651a74857f9a7p17a609jsn475758353616',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Generate a short and catchy caption for an advertisement of a black tshirt for a teenager'
          }
        ]
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

getData();