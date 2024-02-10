import {Link} from 'react-router-dom'

const NavBar = (props) => {

    return (
        <div>
            <h1>NavBar</h1>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/add">Add Trade</Link></button>
            <button><Link to="/ledger">Ledger</Link></button>

        </div>
    )

}

export default NavBar