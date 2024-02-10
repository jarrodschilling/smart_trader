import {Link} from 'react-router-dom'

const Dashboard = (props) => {

    return (
        <div>
            <h1>Dashboard</h1>
            <button><Link to="/add">Add Trade</Link></button>
            <button><Link to="/ledger">Ledger</Link></button>
        </div>
    )

}

export default Dashboard