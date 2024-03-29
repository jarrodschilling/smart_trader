import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import YahooService from "../services/YahooService.jsx";
import TradeDetailsHeader from "../components/TradeDetailsHeader.jsx"
// import OpenTradeDetailsHeader from "../components/OpenTradeDetailsHeader.jsx"
import {dateChanger, totalCostFmt, formatedPrice, formatedPercent, formatedCost} from "../utils/FormatFunctions.js"
// import { currentOpenCost, currentValue, currentGainLoss } from "../utils/CurPortCalcs.js";
import {currentShares, openTradeTrue, groupTrades, gainLoss, totalCost, avgOpenPrice, avgClosePrice, totalSold, percentGainLoss, portfolioPercentImpact} from "../utils/CalcFunctions.js"

const TradeDetails = (props) => {
    const portfolio = 1000000
    const [stocks, setStocks] = useState([])
    const [price, setPrice] = useState({})
    // Pull down state from App.jsx
    const {detailStocks, setDetailStocks} = props

    const stocksVariable = detailStocks[0]
    
    // Calcs for CLOSED Trades
    let tradeGainLoss = gainLoss(stocksVariable)
    let tradeTotalCost = totalCost(stocksVariable)
    let tradeAvgOpenPrice = avgOpenPrice(stocksVariable)
    let tradeAvgClosePrice = avgClosePrice(stocksVariable)
    let tradeTotalSold = totalSold(stocksVariable)
    let tradePercentGainLoss = percentGainLoss(stocksVariable)
    let tradePortfolioPctImpact = portfolioPercentImpact(portfolio, stocksVariable)

    // Calcs for OPEN Trades

    
    return(
        <div>
            <h1>Trade Details</h1>
            <TradeDetailsHeader tradePortfolioPctImpact={tradePortfolioPctImpact} tradePercentGainLoss={tradePercentGainLoss} tradeTotalSold={tradeTotalSold} tradeAvgClosePrice={tradeAvgClosePrice} tradeGainLoss={tradeGainLoss} tradeTotalCost={tradeTotalCost} tradeAvgOpenPrice={tradeAvgOpenPrice} />
            <div className="displayContainer">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ticker</th>
                        <th>Buy/Sell</th>
                        <th>Price</th>
                        <th>Shares</th>
                        <th>Total Value</th>
                        <th>Shaper</th>
                        <th>Tactical</th>
                        <th>OPEN</th>
                        <th>CLOSE</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocksVariable
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((stock, index) => (
                            <tr key={index} 
                            className={`${(stock.buySell === "buy")?'ledgerBuy':'ledgerSell'}`}>
                                <td>{dateChanger(stock.date)}</td>
                                <td>{stock.ticker}</td>
                                <td>{stock.buySell}</td>
                                <td>{formatedPrice(stock.price)}</td>
                                <td>{stock.shares}</td>
                                <td>{totalCostFmt(stock.price, stock.shares)}</td>
                                <td>{stock.shaper}</td>
                                <td>{stock.tactical}</td>
                                <td>{stock.openTrade? "Yes": ""}</td>
                                <td>{stock.closeTrade? "Yes": ""}</td>
                                <td><button className="editDeleteBtn"><Link className="linkNoDec" to={`/update/${stock._id}`}>EDIT</Link></button></td>
                                <td><button className="editDeleteBtn" onClick={()=>deleteHandler(stock._id)}>DELETE</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default TradeDetails