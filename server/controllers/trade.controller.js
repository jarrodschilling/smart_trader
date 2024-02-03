import Trade from "../models/trade.model.js"

async function createTrade(req, res) {
    try {
        const newTrade = await Trade.create(req.body)
        const trade = await newTrade.save()
        res.json(newTrade)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function getAllTrades(req, res) {
    try {
        const allTrades = await Trade.find()
        res.json(allTrades)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function getOneTrade(req, res) {
    try {
        const oneTrade = await Trade.findById(req.params.id)
        res.json(oneTrade)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function editTrade(req, res) {
    const options = {
        new: true,
        runValidators: true
    }
    try {
        const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedTrade)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function deleteOneTrade(req, res) {
    try {
        const deleteTrade = await Trade.findByIdAndDelete(req.params.id)
        res.json(deleteTrade)
    }  catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const TradeController = {
    createTrade: createTrade,
    getAllTrades: getAllTrades,
    getOneTrade: getOneTrade,
    editTrade: editTrade,
    deleteOneTrade: deleteOneTrade
}

export default TradeController