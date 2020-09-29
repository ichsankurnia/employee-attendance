const moment = require('moment')
const { Op } = require("sequelize")
const { Schedule, Employee, Shift } = require('../models')



const addSchedule = async (req, res) => {
    try {
        const data = await Schedule.create(req.body)
        if(data){
            return res.status(201).json({code: 0, message: `success add schedule for employeeId ${data.employeeId}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `fail add schedule for employeeId ${data.employeeId}`, data: null})
        }
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}


const getAllSchedule = async (req, res) => {
    try {
        const data = await Schedule.findAll({
            order: [
                ['date', 'DESC']
            ],
        })

        if(data.length > 0){
            return res.status(200).json({code: 0, message: "success get all data", data: data})
        }else{
            return res.status(200).json({code: 1, message: "schedule doesn't exist", data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}


const getAllScheduleToday = async (req, res) => {
    try {
        const dateNow1 = moment(new Date()).format("DD-MM-YY")
        const dateNow2 = moment(new Date()).format("DD-MM-YYYY")
        const dateNow3 = moment(new Date()).format("DD-MMM-YY")
        const dateNow4 = moment(new Date()).format("DD-MMM-YYYY")
        const dateNow5 = moment(new Date()).format("DD-MMMM-YYYY")
        
        const data = await Schedule.findAll({
            where: { 
                [Op.or]: [
                    { date: dateNow1 }, { date: dateNow2 }, { date: dateNow3 }, { date: dateNow4 },{ date: dateNow5 }
                ]
            },
            attributes: ['employeeId', 'shiftId', 'date'],
            order: [
                ['date', 'DESC']
            ],
            include: [
                {
                    model: Employee,
                    as: 'employees',
                    attributes: ['nik', 'name', 'position']
                },
                {
                    model: Shift,
                    as: 'shifts',
                    attributes: ['shift_name', 'shift_desc', 'min_check_in', 'max_check_in', 'min_check_out', 'max_check_out']
                },
            ]
        })

        if(data.length > 0){
            return res.status(200).json({code: 0, message: `success get all schedule today ${dateNow4}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `today schedule doesn't exist today ${dateNow4}`, data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}


const getAllSchedulebyEmployeId = async (req, res) => {
    try {
        const { employee_id } = req.params

        const data = await Schedule.findAll({
            where : { employeeId: employee_id },
            attributes: ['employeeId', 'shiftId', 'date'],
            order: [
                ['date', 'DESC']
            ],
            include: [
                {
                    model: Employee,
                    as: 'employees',
                    attributes: ['nik', 'name', 'position']
                },
                {
                    model: Shift,
                    as: 'shifts',
                    attributes: ['shift_name', 'shift_desc', 'min_check_in', 'max_check_in', 'min_check_out', 'max_check_out']
                },
            ]
        })

        if(data.length > 0){
            return res.status(200).json({code: 0, message: `success get all schedule with employeeId ${employee_id}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `schedule with employeeId ${employee_id} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}


const getScheduleEmployeIdAndToday = async (req, res) => {
    try {
        const { employee_id } = req.params

        const dateNow1 = moment(new Date()).format("DD-MM-YY")
        const dateNow2 = moment(new Date()).format("DD-MM-YYYY")
        const dateNow3 = moment(new Date()).format("DD-MMM-YY")
        const dateNow4 = moment(new Date()).format("DD-MMM-YYYY")
        const dateNow5 = moment(new Date()).format("DD-MMMM-YYYY")

        const data = await Schedule.findOne({
            where : {
                employeeId: employee_id,
                date: {
                        [Op.or] : [dateNow1, dateNow2, dateNow3, dateNow4, dateNow5]
                }
            },
            attributes: ['employeeId', 'shiftId', 'date'],
            include: [
                {
                    model: Employee,
                    as: 'employees',
                    attributes: ['nik', 'name', 'position']
                },
                {
                    model: Shift,
                    as: 'shifts',
                    attributes: ['shift_name', 'shift_desc', 'min_check_in', 'max_check_in', 'min_check_out', 'max_check_out']
                },
            ]
        })

        if(data){
            return res.status(200).json({code: 0, message: `success get today schedule with employeeId ${employee_id} and today ${dateNow4}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `today schedule with employeeId ${employee_id} and today ${dateNow4} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}


const getAllScheduleByDate = async (req, res) => {
    try {
        const { date } = req.params

        const data = await Schedule.findAll({
            where : {
                date: date
            },
            attributes: ['employeeId', 'shiftId', 'date'],
            order: [
                ['date', 'DESC']
            ],
            include: [
                {
                    model: Employee,
                    as: 'employees',
                    attributes: ['nik', 'name', 'position']
                },
                {
                    model: Shift,
                    as: 'shifts',
                    attributes: ['shift_name', 'shift_desc', 'min_check_in', 'max_check_in', 'min_check_out', 'max_check_out']
                },
            ]
        })

        if(data.length > 0){
            return res.status(200).json({code: 0, message: `success get schedule with date at ${date}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `schedule with date at ${date} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}


const getScheduleEmployeIdAndDate = async (req, res) => {
    try {
        const { employee_id, date } = req.params

        const data = await Schedule.findOne({
            where : {
                employeeId: employee_id,
                date: date
            },
            attributes: ['employeeId', 'shiftId', 'date'],
            include: [
                {
                    model: Employee,
                    as: 'employees',
                    attributes: ['nik', 'name', 'position']
                },
                {
                    model: Shift,
                    as: 'shifts',
                    attributes: ['shift_name', 'shift_desc', 'min_check_in', 'max_check_in', 'min_check_out', 'max_check_out']
                },
            ]
        })

        if(data){
            return res.status(200).json({code: 0, message: `success get today schedule with employeeId ${employee_id} and date at ${date}`, data: data})
        }else{
            return res.status(500).json({code: 1, message: `schedule with employeeId ${employee_id} and date at ${date} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(500).json({code: 1, message: error.message, data: null})
    }
}

const updateScheduleEmployeeByDate = async (req, res) => {
    try {
        const { date } = req.params

        const findSchedule = await Schedule.findOne({
            where: { 
                date : date, 
                employeeId: req.body.employeeId
            }
        })

        if(findSchedule){
            const updateSchedule = await Schedule.update(req.body, {where: {date: date}})

            if(updateSchedule){
                const data = await Schedule.findOne({
                    where: { 
                        date : date, 
                        employeeId: req.body.employeeId
                    }
                })

                return res.status(202).json({code: 0, message: `success update schedule with employeeId ${req.body.employeeId} and date at ${date}`, data: data})
            }else{
                return res.status(500).json({code: 1, message: `fail update schedule with employeeId ${req.body.employeeId} and date at ${date}`, data: null})
            }
        }else{
            return res.status(400).json({code: 1, message: `schedule with employeeId ${req.body.employeeId} and date at ${date} doesn't exist`, data: null})
        }
    } catch (error) {
        return res.status(400).json({code: 1, message: error.message, data: null})
    }
}

module.exports = {
    addSchedule,
    getAllSchedule,
    getAllScheduleToday,
    getAllSchedulebyEmployeId,
    getScheduleEmployeIdAndToday,
    getAllScheduleByDate,
    getScheduleEmployeIdAndDate,
    updateScheduleEmployeeByDate
}