import { useEffect, useState} from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [amount , setAmount] = useState(1)
  const [fromCurrency , setFromCurrency] = useState("USD")
  const [toCurrency , setToCurrency] = useState("INR")
  const [convertCurrency , setConvertCurrency] = useState(null)
  const [exchangeRate , setExchangeRate] = useState(null)

  // Exchange Rate USD to INR
  useEffect(()=>{
    const getExchangeRate = async()=>{
      try{
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        let resp = await axios.get(url)
        setExchangeRate(resp.data.rates[toCurrency])
      }
      catch(error){
        console.log("Error fetching exchange Rate:", error)
      }
    }
    getExchangeRate()
  },[fromCurrency , toCurrency])


  // Converted Currency Multiple 2USD into INR
  useEffect(()=>{
    if(exchangeRate !== null){
      setConvertCurrency((exchangeRate * amount).toFixed(2))
    }
  },[exchangeRate,amount])



  const handleAmount = (e)=>{
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }
  return (
    <>
      <div className="currency-convertor">

        <div className="box"></div>

        <div className="data">
          <h2>Currency Convertor</h2>

          <div className="data-input">
            <label htmlFor="amount">Amount:</label>
            <input type="number" min="0" id="amount" value={amount} onChange={handleAmount}/>
          </div>

          <div className="input-container">
            <label htmlFor="fromAmount">From amount:</label>
            <select id="fromAmount" value={fromCurrency} onChange={(e)=>{setFromCurrency(e.target.value)}}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CYN">CYN - Chinese Yen</option>
              <option value="INR">INR - Indian rupee</option>
              <option value="BRL">BRL - Brazillian Real</option>
              <option value="ZAN">ZAN - South African Rand</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="toAmount">To amount:</label>
            <select id="toAmount" value={toCurrency} onChange={(e)=>{setToCurrency(e.target.value)}}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CYN">CYN - Chinese Yen</option>
              <option value="INR">INR - Indian rupee</option>
              <option value="BRL">BRL - Brazillian Real</option>
              <option value="ZAN">ZAN - South African Rand</option>
            </select>
          </div>

          <div className="result">
            {amount > 0 ?<p> {amount} {fromCurrency} is equal to {convertCurrency} {toCurrency}</p> : <p style={{color:"#ad2b2b"}}>Please enter an amount greater than 0</p> }
          </div>

        </div>
      </div>
    </>
  )
}

export default App
