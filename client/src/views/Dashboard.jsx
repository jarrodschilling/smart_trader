import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import YahooService from '../services/YahooService'

const Dashboard = (props) => {

    useEffect(() => {
        // Fetch stock prices when the component mounts
            const symbol = "CCJ";
            YahooService.getName(symbol)
            .then((res) => {
                console.log(res)
                console.log(res.quoteType.result[0].shortName)
                // const price = res.chart.result[0].meta.regularMarketPrice;
                // console.log(price)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button><Link to="/add">Add Trade</Link></button>
            <button><Link to="/ledger">Ledger</Link></button>
        </div>
    )

}

export default Dashboard