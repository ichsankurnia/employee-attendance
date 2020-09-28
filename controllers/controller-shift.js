const { Shift } = require('../models');

const createNewShift = async (req, res) => {
    try {
        const data = await Shift.create(req.body)

        if(data)
            return res.status(201).json({code: 0, message: "success add new shift", data: data})
        else
            return res.status(400).json({code: 1, message: "fail add shift", data: null})
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}

const getAllShift = async (req, res) => {
    try {
        const data = await Shift.findAll({order: [
            ['min_check_in', 'ASC']
          ]})

        if(data.length > 0)
            return res.status(200).json({code: 0, message: "success get all shift", data: data})
        else
            return res.status(500).json({code: 1, message: "data shift doesn't exist", data: null})
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}


const updateShift = async (req, res) => {
    try {
        const { id } = req.params
        const payloadRequest = req.body

        const dataShift = await Shift.findOne({where: {id: id}})
        if(dataShift){
            const data = await Shift.update(payloadRequest, { where: {id: id } })

            if(data){
                const updatedData = await Shift.findOne({where: {id: id}})

                return res.status(201).json({code: 0, message: `success updated shift id ${id}`, data: updatedData})
            }
            else
                return res.status(500).json({code: 1, message: `fail updated shift id ${id}`, data: null})
        }else{
            return res.status(400).json({code: 1, message: `data with id ${id} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}


const deleteShift = async (req, res) => {
    try {
        const { id } = req.params
        
        const dataShift = await Shift.findOne({where: {id: id}})
        if(dataShift){
            const data = await Shift.destroy({where: {id: id}})

            if(data)
                return res.status(201).json({code: 0, message: `success deleted shift id ${id}`, data: data})
            else
                return res.status(500).json({code: 1, message: `fail deleted shift id ${id}`, data: null})
        }else{
            return res.status(400).json({code: 1, message: `data with id ${id} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}


const truncateShift = async (req, res) => {
    try {
        await Shift.destroy({truncate: { cascade: true }, restartIdentity: true})
        
        return res.json({code: 0, message: 'all shift successfully truncates', data: null})
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}


module.exports = {
    createNewShift,
    getAllShift,
    updateShift,
    deleteShift,
    truncateShift
}