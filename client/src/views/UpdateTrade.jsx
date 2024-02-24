import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import StockService from "../services/StockService"
import UpdateTradeHandler from "../hooks/UpdateTradeHandler"

const UpdateTrade = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {handleChange, stockState, setStockState, formErrors, notRequired} = UpdateTradeHandler()
    const [errors, setErrors] = useState([])
    
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    useEffect(() => {
        StockService.getOneStock(id)
            .then((res) => {
                console.log(res)
                setStockState(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    function dateFormat(dateISO) {
        const updatedDate = new Date(dateISO).toISOString().split('T')[0];
        return updatedDate
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        StockService.updateOneStock(id, stockState)
            .then(res => {
                console.log(res)
                navigate('/ledger')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className="tradeFormContainer">
            <h1>Update Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                <div className="formCol">

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={dateFormat(stockState.date)} onChange={handleChange} />
                {errors.date? <p>{errors.date.message}</p>: <p> </p>}
                
                <label htmlFor="shares">Shares</label>
                <input type="number" name="shares" id="shares" value={stockState.shares} onChange={handleChange} />
                {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                {errors.shares && <p>{errors.shares.message}</p>}

                <label htmlFor="shaper">Shaper</label>
                <select name="shaper" id="shaper" value={stockState.shaper} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Cup w/ Handle">Cup w/ Handle</option>
                        <option value="Cup no Handle">Cup no Handle</option>
                        <option value="Coil">Coil</option>
                        <option value="Flat Base">Flat Base</option>
                        <option value="High Tight Flag">High Tight Flag</option>
                        <option value="Double Bottom">Double Bottom</option>
                        <option value="Inverse Head and Shoulders">Inverse Head and Shoulders</option>
                        <option value="De-risk">De-risk</option>
                        <option value="Earnings Soon">Earnings Soon</option>
                    </select>
                {notRequired.shaper? <p>{notRequired.shaper}</p>: <p> </p>}
                {errors.shaper && <p>{errors.shaper.message}</p>}

                <button className={`${(validateForm() === false)?"jsDisabled": "confirmTrade"}`} type="submit" disabled={!validateForm()}>Confirm Trade</button>
            </div>
            <div className="formCol">

                <label htmlFor="buySell">Buy/Sell</label>
                <select name="buySell" id="buySell" value={stockState.buySell} onChange={handleChange}>
                    <option value="none">Pick One</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
                {formErrors.buySell? <p>{formErrors.buySell}</p>: <p> </p>}
                {errors.buySell && <p>{errors.buySell.message}</p>}

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" value={stockState.price} onChange={handleChange} />
                {formErrors.price? <p>{formErrors.price}</p>: <p> </p>}
                {errors.price && <p>{errors.price.message}</p>}

                <label htmlFor="tactical">Tactical</label>
                <select name="tactical" id="tactical" value={stockState.tactical} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Mini Coil">Mini Coil</option>
                        <option value="Kicker">Kicker</option>
                        <option value="Downtrend Line">Downtrend Line</option>
                        <option value="Breakout PB to 20EMA">Breakout PB to 20EMA</option>
                        <option value="Gap Up PB to 8EMA">Gap Up PB to 8EMA</option>
                        <option value="Pull Back to 50SMA">Pull Back to 50SMA</option>
                        <option value="First Touch of the 10WK SMA">First Touch of the 10WK SMA</option>
                        <option value="Stop Hit">Stop Hit</option>
                        <option value="De-risking">De-risking</option>
                    </select>
                {notRequired.tactical? <p>{notRequired.tactical}</p>: <p> </p>}
                {errors.tactical && <p>{errors.tactical.message}</p>}

                </div>
                <div className="formCol">
                <label htmlFor="ticker">Ticker</label>
                <input type="text" name="ticker" id="ticker" value={stockState.ticker} onChange={handleChange} />
                {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}
                {errors.ticker && <p>{errors.ticker.message}</p>}

                {
                    stockState.buySell === "sell"?
                    <>
                        <label htmlFor="closeTrade">Close Trade?</label>
                        <select name="closeTrade" id="closeTrade" value={stockState.closeTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                }

                {
                    stockState.buySell === "buy"?
                    <>
                        <label htmlFor="openTrade">Open Trade?</label>
                        <select name="openTrade" id="openTrade" value={stockState.openTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                }

                </div>
                
            </form>
        </div>
    )

}

export default UpdateTrade