import React, { useEffect, useState } from 'react';
import './App.scss';
import StockItem from './Components/StockItem/StockItem';

export interface stocksItemInterface {
  label: string,
  ticker: boolean,
  value: string,
  category: string,
  uid: string
}

const App: React.FC = () => {
  const [stocksList, setStockList] = useState<stocksItemInterface[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");

  useEffect(() => {
      const filterBy = filterInput? filterInput: "M"
      fetch(`https://trautocomplete.azurewebsites.net/api/Autocomplete/GetAutocomplete?name=${filterBy}`)
      .then(response => response.json())
      .then(resData => {
        const tempList: stocksItemInterface[] = resData
        tempList.sort((a, b) => {
          if(a.label > b.label){
            return 1
           }else{
             return -1
           }
          })
        setStockList(tempList.slice(0,9))
      })
  }, [filterInput])



  return (
    <div className="App">
        <form>
          <input
                type="text"
                value = {filterInput}
                onChange={e => setFilterInput(e.target.value)}/>  
        </form>
      {stocksList.length > 0 && (
        <ul className="stocks-wrapper">
        {stocksList.map((itemData: stocksItemInterface, index: number) => {
          return (
            <StockItem stockData= {itemData} index={index} key= {itemData.uid}/>
          )
        })
        }
        </ul>      
      )}
    </div>
  )
}

export default App;
