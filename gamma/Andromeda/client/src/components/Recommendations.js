import '../styles/Recommendation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
function Recommendations() {
  let navigate = useNavigate();
  const currUser = localStorage.getItem('loggedUser');
  var age;
  var nationality;
  var gender;
  var userDetails = {};
  var prompt1, prompt2, prompt3;
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [generatedCaption2, setGeneratedCaption2] = useState('');
  const [generatedCaption3, setGeneratedCaption3] = useState('');
  const [imagePrompt1, setImagePrompt1] = useState('');
  const [imagePrompt2, setImagePrompt2] = useState('');
  const [imagePrompt3, setImagePrompt3] = useState('');
  var top_three = [];
  const [product1, setProduct1] = useState();
  const [product2, setProduct2] = useState();
  const [product3, setProduct3] = useState();
  useEffect(() => {
    (async () => {
      try {
        let data = {
          name: currUser,
        };
        const response = await api.post(`/user/search-by-name`, data);
        if (response.data.user.name === data.name) {
          userDetails = {
            nationality: response.data.user.nationality,
            gender: response.data.user.gender,
            age: response.data.user.age,
          };
        }
        top_three.push(
          response.data.top3[0].name + ' ' + response.data.top3[0].category
        );
        top_three.push(
          response.data.top3[1].name + ' ' + response.data.top3[1].category
        );
        top_three.push(
          response.data.top3[2].name + ' ' + response.data.top3[2].category
        );
        setProduct1(response.data.top3[0]._id);
        setProduct2(response.data.top3[1]._id);
        setProduct3(response.data.top3[2]._id);
      } catch (error) {
        console.log(error);
        return;
      }

      //***sk-9ZfRp4v****hvusX*4rL5OABfT3Bl***bkFJHLC7v****7N9WljLTYiL6KzP
      const apiKey = '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';

      try {
        age = userDetails.age;
        nationality = userDetails.nationality;
        gender = userDetails.gender;
        if (gender === 'Male') {
          if (age < 20) gender = 'boy';
          else gender = 'man';
        }
        if (gender === 'Female') {
          if (age < 20) gender = 'girl';
          else gender = 'lady';
        }
        prompt1 =
          'Create a catchy caption of 7 words for an advertisement for ' +
          top_three[0] +
          ' used by ' +
          nationality +
          ' ' +
          gender +
          ' of age ' +
          age;

        prompt2 =
          'Create a catchy caption of 7 words for an advertisement for ' +
          top_three[1] +
          ' used by ' +
          nationality +
          ' ' +
          gender +
          ' of age ' +
          age;

        prompt3 =
          'Create a catchy caption of 7 words for an advertisement for ' +
          top_three[2] +
          ' used by ' +
          nationality +
          ' ' +
          gender +
          ' of age ' +
          age;
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: prompt1,
              },
            ],
            temperature: 0.8,
            max_tokens: 30,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setGeneratedCaption(response.data.choices[0].message.content);

        setCount1(1);
        const response2 = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: prompt2,
              },
            ],
            temperature: 0.8,
            max_tokens: 30,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        setGeneratedCaption2(response2.data.choices[0].message.content);

        setCount2(1);
        const response3 = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: prompt3,
              },
            ],
            temperature: 0.8,
            max_tokens: 30,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        setGeneratedCaption3(response3.data.choices[0].message.content);
        setCount3(1);
      } catch (error) {
        console.error('Error generating caption:', error);
      }
      setImagePrompt1(
        'http://image.pollinations.ai/prompt/image%20of%20an%20' +
          nationality +
          '%20' +
          gender +
          '%20age%20' +
          age +
          '%20using%20' +
          top_three[0]
      );
      setImagePrompt2(
        'http://image.pollinations.ai/prompt/image%20of%20an%20' +
          nationality +
          '%20' +
          gender +
          '%20age%20' +
          age +
          '%20using%20' +
          top_three[1]
      );
      setImagePrompt3(
        'http://image.pollinations.ai/prompt/image%20of%20an%20' +
          nationality +
          '%20' +
          gender +
          '%20age%20' +
          age +
          '%20using%20' +
          top_three[2]
      );
      console.log(prompt1, prompt2, prompt3);
    })();
  }, []);

  return (
    <div className='recmmendation-div'>
      <div className='rec-img-div'>
        <div
          className='rec-1 all-recs'
          onClick={() => {
            console.log(product1);
            navigate(`/product/${product1}`);
          }}
        >
          <img alt='test' src={imagePrompt1} width='96%' />
          {count1 && (
            <>
              <div className='all-captions caption-1'>{generatedCaption}</div>
            </>
          )}
          {count1 === 0 && (
            <>
              <div className='all-captions caption-1'></div>
            </>
          )}
        </div>
        <div
          className='rec-2 all-recs'
          onClick={() => {
            navigate(`/product/${product2}`);
          }}
        >
          <img alt='test' src={imagePrompt2} width='96%' />{' '}
          {count2 && (
            <>
              <div className='all-captions caption-2'>{generatedCaption2}</div>
            </>
          )}
          {count2 === 0 && (
            <>
              <div className='all-captions caption-2'></div>
            </>
          )}
        </div>
        <div
          className='rec-3 all-recs'
          onClick={() => {
            navigate(`/product/${product3}`);
          }}
        >
          <img alt='test' src={imagePrompt3} width='96%' />{' '}
          {count3 && (
            <>
              <div className='all-captions caption-3'>{generatedCaption3}</div>
            </>
          )}
          {count3 === 0 && (
            <>
              <div className='all-captions caption-3'></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
