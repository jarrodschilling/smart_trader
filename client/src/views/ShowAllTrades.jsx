import { useState, useEffect } from "react";
import axios from 'axios'

const ShowAllTrades = (props) => {
    const [trades, setTrades] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/trades")
            .then((res) => {
                console.log(res.data)
                setTrades(res.data)
            })
    }, [])

    return (
        <div>
            {
                trades.map((trade) => {
                    <div>
                        <p>{trade.ticker}</p>
                    </div>
                })
            }
        </div>
    )

}