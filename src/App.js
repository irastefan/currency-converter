import React, {useState, useEffect} from 'react';
import './App.css';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import namesCurrency from './components/namesCurrency';

function App() {

  const [selectValue, setSelectValue] = useState({value: 'USDUSD'});
  const [selectValue2, setSelectValue2] = useState({value: 'USDILS'});

  const setCurrency = (value, setSelectValue) => {
    setSelectValue({value: value});
  
  }
 

  const [inputValue, setInput] = useState(1);
  const [inputValue2, setInput2] = useState(1);

  const [quotes, setQuotes] = useState(null)


  const currencyToDollar = (quotes , valueCurrency, inputValue) => {
    for (const key in quotes) {
      if (key === valueCurrency) {
        return inputValue / quotes[key]
      }
    }
  }

  const getCurrency = (quotes , valueCurrency, inputValue) => {
    for (const key in quotes) {
      if (key === valueCurrency) {
        return Math.floor(inputValue * quotes[key] * 100) / 100 
      }
    }
  }

 
  const options = []
    for (const key in namesCurrency) {
        options.push({value: key, label: namesCurrency[key]})
  }


  useEffect(() => {
   if (quotes === null) {
      let request = new XMLHttpRequest();
      request.open('GET',  'http://api.currencylayer.com/live?access_key=09b3a98386a15b8c7b1817c7adebfe9a&format=1', true);
      
      request.onload = function () {
      let data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) { 
        setQuotes(data.quotes)

        const dollar = currencyToDollar(data.quotes, selectValue.value, inputValue)     
        setInput2(getCurrency(data.quotes, selectValue2.value, dollar))
      }
    }
    request.send();

    
  }
  
  }, [])
//console.log(quotes)
  

  return (
    <div className="App">
        <h1>Currency Converter</h1>
        <div className='converter'>
        <div>
          <Select 
          onChange ={(current) => {
            const dollar = currencyToDollar(quotes, current.value, inputValue)     
            setInput2(getCurrency(quotes, selectValue2.value, dollar))
            setCurrency(current.value, setSelectValue) 
          }} 
          options={options} 
          defaultValue={options[143]}
          theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#78b0a0',
                primary: 'black',
              },
            })}
          />
          <input type='number' 
            value={inputValue} 
            onChange={event => {
              setInput(event.target.value)   
              const dollar = currencyToDollar(quotes, selectValue.value, event.target.value)     
              setInput2(getCurrency(quotes, selectValue2.value, dollar))
              
            }} />
        </div>

        <div className='icon'>
          <FontAwesomeIcon icon={faRightLeft} />
        </div>

        <div>
          <Select 
          onChange ={(current) => {
            const dollar = currencyToDollar(quotes, current.value, inputValue2)     
            setInput(getCurrency(quotes, selectValue.value, dollar))
            setCurrency(current.value, setSelectValue2) 
          }} 
          options={options} 
          defaultValue={options[59]}
          theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#78b0a0',
                primary: 'black',
              },
            })}
          />
          <input type='number' value={inputValue2} onChange={event => {
              setInput2(event.target.value)
              const dollar = currencyToDollar(quotes, selectValue2.value, event.target.value)     
              setInput(getCurrency(quotes, selectValue.value, dollar))
            }
          } />
        </div>    
        </div>
    </div>
  );
}

export default App;
