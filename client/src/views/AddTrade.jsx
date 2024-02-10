import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StockService from "../services/StockService"

const AddTrade = (props) => {
    const navigate = useNavigate()

    const [stockState, setStockState] = useState({
        ticker: "",
        price: 0,
        date: 0,
        shares: 0,
        buySell: "",
        shaper: "",
        tactical: ""
    })

    const [errors, setErrors] = useState([])
    const [formErrors, setFormErrors] = useState({
        ticker: "Ticker required",
        price: "Price required",
        date: "Date required",
        shares: "Shares required",
        buySell: "Buy or Sell required"
    })

    const handleChange = (e) => {
        if (e.target.name === "ticker") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ''
            if (newValue) {
                if (newValue.length < 1) {
                    errorMsg = "Ticker must have at least one character"
                } else if (newValue.length > 5) {
                    errorMsg = "Ticker cannot be more than five characters long"
                }
            } else {
                errorMsg = "Ticker symbol required"
            }
            setFormErrors({...formErrors, ticker: errorMsg})
        }
        else if (e.target.name === "price") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ""
            if (newValue) {
                if (newValue < 10) {
                    errorMsg = "Don't buy stocks under $10"
                } else if (newValue>5000) {
                    errorMsg = "What stock trades above $5,000??"
                }
            } else {
                errorMsg = "Price required"
            }
            setFormErrors({...formErrors, price: errorMsg})
        }
        else if (e.target.name === "shares") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ""
            if (newValue) {
                if (newValue < 1) {
                    errorMsg = "Must be at least one share"
                } else if (newValue>100000) {
                    errorMsg = "Are you really buying more than 100,000 shares??"
                }
            } else {
                errorMsg = "Number of shares required"
            }
            setFormErrors({...formErrors, shares: errorMsg})
        }
        else if (e.target.name === "buySell") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ''
            if (newValue) {
                if (newValue.length < 3) {
                    errorMsg = "BUY or SELL only"
                } else if (newValue.length > 4) {
                    errorMsg = "BUY or SELL only"
                }
            } else {
                errorMsg = "Trade type required"
            }
            setFormErrors({...formErrors, buySell: errorMsg})
        }
        else if (e.target.name === "shaper") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let reminderMsg = ''
            if (newValue) {
                if (newValue === "none") {
                    reminderMsg = "Do you want a shaper pattern?"
                }
            } else {
                reminderMsg = "Do you want a shaper pattern?"
            }
            setNotRequired({...notRequired, shaper: reminderMsg})
        }
        else if (e.target.name === "tactical") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let reminderMsg = ''
            if (newValue) {
                if (newValue === "none") {
                    reminderMsg = "Do you want a tactical pattern?"
                }
            } else {
                reminderMsg = "Do you want a tactical pattern?"
            }
            setNotRequired({...notRequired, tactical: reminderMsg})
        }
        else if (e.target.name === "date") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            const currentDate = new Date();
            console.log(currentDate)
            console.log(stockState.date)
            let errorMsg = ""
            if (!stockState.date) {
                setFormErrors({...formErrors, date: errorMsg})
            }
        }
    }

    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        StockService.addOneStock(stockState)
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
        <div>
            <h1>Add Trade</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ticker">Ticker</label>
                <input type="text" name="ticker" id="ticker" value={stockState.ticker} onChange={handleChange} />
                {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}
                {errors.ticker && <p>{errors.ticker.message}</p>}

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" value={stockState.price} onChange={handleChange} />
                {formErrors.price? <p>{formErrors.price}</p>: <p> </p>}
                {errors.price && <p>{errors.price.message}</p>}

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={stockState.date} onChange={handleChange} />
                {errors.date? <p>{errors.date.message}</p>: <p> </p>}

                <label htmlFor="shares">Shares</label>
                <input type="number" name="shares" id="shares" value={stockState.shares} onChange={handleChange} />
                {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                {errors.shares && <p>{errors.shares.message}</p>}

                <label htmlFor="buySell">Buy/Sell</label>
                <select name="buySell" id="buySell" value={stockState.buySell} onChange={handleChange}>
                    <option value="none">Pick One</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
                {formErrors.buySell? <p>{formErrors.buySell}</p>: <p> </p>}
                {errors.buySell && <p>{errors.buySell.message}</p>}

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
                {formErrors.shaper? <p>{formErrors.shaper}</p>: <p> </p>}
                {errors.shaper && <p>{errors.shaper.message}</p>}

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
                        <option value="Kicker">Stop Hit</option>
                        <option value="De-risking">De-risking</option>
                    </select>
                {formErrors.tactical? <p>{formErrors.tactical}</p>: <p> </p>}
                {errors.tactical && <p>{errors.tactical.message}</p>}

                <button type="submit" disabled={!validateForm()}>Confirm Trade</button>
            </form>
        </div>
    )

}

export default AddTrade