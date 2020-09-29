const { Attendance, Shift, Employee, Schedule } = require('../models');
const moment = require('moment')


function getTIme(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + " " + ampm;
  return strTime;
}

const getAMorPM = (date) => {
  return date.substring(date.length - 2, date.length)
}

class AttendanceController  {
  static async addAttendance(req, res, next) {
    try {

      const dateNow = new Date()
      
      const input = {
        employeeId: req.body.employee_id,
        type: req.body.type,
        status: req.body.status,
        geolocation: req.body.geolocation,
        ipAddress: req.body.ipAddress,
        day: moment(dateNow).format("dddd"),
        date: moment(dateNow).format("DD-MMM-YYYY"),
        time: moment(dateNow).format("hh:mm:ss A"),
        timestamp: dateNow.getTime()
      }

      const employeeShift = await Schedule.findOne({
          where: { 
            employeeId : input.employeeId,
            date: input.date
          } 
        })

      console.log(employeeShift)

      if(employeeShift){
        const dataShift = await Shift.findOne({where: {id: employeeShift.dataValues.shiftId}})
  
        if(dataShift){
          input.shiftId = employeeShift.dataValues.shiftId
  
          const currTime = moment(getTIme(dateNow), "HH:mm A")
          const minCheckIn = moment(dataShift.dataValues.min_check_in, "HH:mm A")
          const maxCheckIn = moment(dataShift.dataValues.max_check_in, "HH:mm A")
          const minCheckOut = moment(dataShift.dataValues.min_check_out, "HH:mm A")
          const maxCheckOut = moment(dataShift.dataValues.max_check_out, "HH:mm A")
    
          if(input.status.toLowerCase() === "check_in" || input.status.toLowerCase() === "check in" || input.status.toLowerCase() === "check-in"){
            if(minCheckIn.isAfter(maxCheckIn)){
              maxCheckIn.add(1, 'days')
              if(getAMorPM(getTIme(dateNow)).toLowerCase() === "am"){
                  if(currTime.isBefore(minCheckIn) && currTime.isBefore(maxCheckIn)){
                      currTime.add(1, 'days')
                  }
              }
            }
          }else{
            if(minCheckOut.isAfter(maxCheckOut)){
              maxCheckOut.add(1, 'days')
              if(getAMorPM(getTIme(dateNow)).toLowerCase() === "am"){
                  if(currTime.isBefore(minCheckOut) && currTime.isBefore(maxCheckOut)){
                      currTime.add(1, 'days')
                  }
              }
            }
          }
    
    
          let code = 0, message = "", desc = ""
    
          if(input.status.toLowerCase() === "check_in" || input.status.toLowerCase() === "check in" || input.status.toLowerCase() === "check-in"){
            if(currTime.isBefore(minCheckIn)) {
              code = 1; message = "You're too early to Check In"; desc = "Too Early Check-In"
            }else if(currTime.isAfter(maxCheckIn)){
              code = 2; message = "You are late to Check In"; desc = "Late Check-In"
            }else{
              code = 0; message = "Success Check In"; desc = "Success Check-In"
            }
          }else{
            if(currTime.isBefore(minCheckOut)){
              code = 3; message = "You're too early to Check Out"; desc = "Too Early Check-Out"
            }else if (currTime.isAfter(maxCheckOut)){
              code = 4; message = "You are late to Check Out"; desc = "Late Check-Out"
            }else{
              code = 0; message = "Success Check Out"; desc = "Success Check-Out"
            }
          }
    
          input.attendance_desc = desc
  
          const attendance = await Attendance.create(input);
    
          return res.status(201).json({code: code, message: message, data: attendance});

        }else{
          return next({
            status: 404,
            name: 'NotFound',
            message: 'Shift not found'
          });  
        }
      }else{
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Schedule not found'
        });
      }

    } catch (err) {
      return next(err);
    }
  }

  static async getAttendances(req, res, next) {
    try {
      const attendance = await Attendance.findAll({
        order: [
          ['timestamp', 'DESC']
        ],
        attributes : ["id","type", "status", "day", "date", "time", "timestamp", "geolocation", "ipAddress", "employeeId"],
        include: [
          {
            model : Employee,
            as: "employees",
            attributes : ["nik", "name", "position"],
          },
          {
            model : Shift,
            as: "shifts",
            attributes : ["shift_name", "shift_desc"],
          },
        ],
      });

      return res.status(200).json(attendance);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteAttendance(req, res, next) {
    try {
      const id = req.params.id;

      const attendance = await Attendance.destroy({
        where: {
          id
        }
      });

      if (attendance) {
        return res.status(200).json({ message: 'Attendance has deleted successfully' });
      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Attendance not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  }


  static async truncateAttendance(req, res, next) {
    try {
      await Attendance.destroy({truncate: { cascade: true }, restartIdentity: true});
      
      return res.status(200).json({ message: 'Attendance has truncate successfully' });
    } catch (err) {
      return next(err);
    }
  }


  static async getAttendanceToday(req, res, next){
    try {
      const attendance = await Attendance.findAll({
        where: {
          date: moment(new Date()).format("DD-MMM-YYYY")
        },
        order: [
          ['timestamp', 'DESC']
        ],
        attributes : ["id","type", "status","day", "date", "time", "timestamp", "geolocation", "ipAddress", "employeeId", 'shiftId'],
        include: [
          {
            model : Employee,
            as: "employees",
            attributes : ["nik", "name", "position"],
          },
          {
            model : Shift,
            as: "shifts",
            attributes : ["shift_name", "shift_desc"],
          },
        ]
      });

      if(attendance.length > 0){
        return res.status(200).json({code: 0, status: "success", data: attendance})        
      }else{
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Attendance not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  static async getAttendanceByDate(req, res, next){
    try {
      const { date } = req.params
      const attendance = await Attendance.findAll({
        where: {
          date: date
        },
        order: [
          ['timestamp', 'DESC']
        ],
        attributes : ["id","type", "status", "day", "date", "time", "timestamp", "geolocation", "ipAddress", "employeeId", 'shiftId'],
        include: [
          {
            model : Employee,
            as: "employees",
            attributes : ["nik", "name", "position"],
          },
          {
            model : Shift,
            as: "shifts",
            attributes : ["shift_name", "shift_desc"],
          },
        ]
      });

      if(attendance.length > 0){
        return res.status(200).json({code: 0, status: "success", data: attendance})        
      }else{
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Attendance not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  }

}



module.exports = AttendanceController;
