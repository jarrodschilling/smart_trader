import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import StockService from "../services/StockService.jsx";
import TradeStatsHeader from "../components/TradeStatsHeader.jsx"
import {dateChanger, formatedPrice, formatedCost, formatedPercent} from "../utils/FormatFunctions.js"
import { groupTrades, totalCost, avgOpenPrice, totalSold, avgClosePrice, percentGainLoss, portfolioPercentImpact,getOpenDate, getCloseDate, getOwnedShares, gainLoss, openTradeTrue } from "../utils/CalcFunctions.js";
import { battingAvg, avgDollarWinLoss, avgPctWinLoss, avgPortWinLoss, realizedGainLoss, totalDollarPL, totalPctPL, clearOpenTrades } from "../utils/PortStatFunctions.js";

const TradeStats = (props) => {
    const portfolio = 1000000
    const unrealizedGainLoss = 250000
    const [stocks, setStocks] = useState([])
    const {stateUpdater, setDetailStocks} = props
    const navigate = useNavigate()
    

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                // console.log(res)
                console.log(groupTrades(res));
                setStocks(groupTrades(res));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    let updatedTrades = clearOpenTrades(stocks)
    // console.log(updatedTrades)
    let winPct = formatedPercent(battingAvg(updatedTrades).winPct)
    let lossPct = formatedPercent(battingAvg(updatedTrades).lossPct)
    let avgWinUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalWin)
    let avgLossUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalLoss)
    let avgWinPct = formatedPercent(avgPctWinLoss(updatedTrades).finalWin)
    let avgLossPct = formatedPercent(avgPctWinLoss(updatedTrades).finalLoss)
    let avgPortWin = formatedPercent(avgPortWinLoss(updatedTrades).finalWin)
    let avgPortLoss = formatedPercent(avgPortWinLoss(updatedTrades).finalLoss)
    let rlzGainLoss = realizedGainLoss(updatedTrades)
    let totalPL = totalDollarPL(rlzGainLoss, unrealizedGainLoss)
    let totalPLPct = totalPctPL(portfolio, totalPL)


    const detailsHandler = (tradeGroup) => {
        let newValue = tradeGroup
        stateUpdater(newValue)
        console.log(`new value: ${newValue[0]}`)
        navigate('/trades/details')
    }


    return(
        <div>
            <h1>Trading Statistics</h1>
            <TradeStatsHeader unrealizedGainLoss={unrealizedGainLoss} totalPLPct={totalPLPct} totalPL={totalPL} rlzGainLoss={rlzGainLoss} avgPortLoss={avgPortLoss} avgPortWin={avgPortWin} avgLossPct={avgLossPct} avgWinPct={avgWinPct} winPct={winPct} lossPct={lossPct} avgWinUSD={avgWinUSD} avgLossUSD={avgLossUSD}/>
            <div className="displayContainer">
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Open Date</th>
                        <th>Close Date</th>
                        <th>Avg Open Price</th>
                        <th>Shares</th>
                        <th>Open Cost</th>
                        <th>Close Price</th>
                        <th>Close Value</th>
                        <th>Gain/Loss</th>
                        <th>Gain/Loss %</th>
                        <th>Portfolio P/L</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks
                        .sort((a, b) => new Date(a[0].date) - new Date(b[0].date))
                        .map((stock, index) => (
                            <tr key={index} className={`${(openTradeTrue(stock) === false)? '':(gainLoss(stock)>0)? 'ledgerBuy': 'ledgerSell'}`}>            
                                {/* {console.log(openTradeTrue(stock))} */}
                                <td>{stock[0].ticker}</td>
                                <td>NAME</td>
                                <td>{dateChanger(getOpenDate(stock))}</td>
                                <td>{dateChanger(getCloseDate(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPrice(avgOpenPrice(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{getOwnedShares(stock)}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(totalCost(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPrice(avgClosePrice(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(totalSold(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(gainLoss(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPercent(percentGainLoss(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPercent(gainLoss(stock)/(portfolio)*100)}</td>
                                
                                {/* <td><button className="editDeleteBtn"><Link className="linkNoDec" to={`/trades/${stock}/details`}>Details</Link></button></td> */}
                                {/* <td><button className="editDeleteBtn" onClick={()=>detailsHandler(stock)}>Details</button></td> */}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default TradeStats