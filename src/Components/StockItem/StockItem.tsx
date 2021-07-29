import React, {useRef} from "react";
import { stocksItemInterface } from '../../App';

const StockItem: React.FC<{stockData: stocksItemInterface , index: number}> = (props) => {
    const inputRef = useRef<HTMLLIElement>(null);

    const alertHandler = (event: any) => {
        if(event.target === inputRef.current){
            event.stopPropagation();
            alert(`this is the stock uid: ${props.stockData.uid}`)
        }else{
            alert(`this is the stock position:${props.index}`)
        }
    }

    return (
        <li className="item-container" onClick={(event) => alertHandler(event)} role="button">
            <ul>
                <li>{props.stockData.label}</li>
                <li>{props.stockData.category}</li>
                <li className="showEllipses" 
                    ref={inputRef}
                    role="button">
                        {props.stockData.uid}
                </li>
                <li>{props.stockData.value}</li>
            </ul>
        </li> 
    )
}

export default StockItem;