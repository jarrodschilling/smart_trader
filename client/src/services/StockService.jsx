import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/api"
})

function getAllStocks() {
    return http.get('/trades')
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function addOneStock(stock) {
    return http.post('/trades/add', stock)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function deleteOneStock(id) {
    return http.delete(`/trades/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

const StockService = {
    getAllStocks: getAllStocks,
    addOneStock: addOneStock,
    deleteOneStock: deleteOneStock
}

export default StockService