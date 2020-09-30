const fs = require('fs');
const csv = require('csv');
const { Shift } = require('../models');

class ImportController {
  static importEmployee(req, res, next) {
    const input = fs.createReadStream(req.file.path);
    const parser = csv.parse({
      delimiter: ',',
      columns: true,
    });

    const transform = csv.transform(function (row) {
      const resultObj = {
        nik: row.nik,
        name: row.name,
        position: row.position,
        username: row.username,
        password: row.password,
        shiftId: row.shiftId,
      };
      console.log(resultObj);
      Employee.create(resultObj)
        .then(function () {
          res.status(200).json({
            message: 'Employee data has been successfuly recorded',
          });
        })
        .catch(function (err) {
          res.status(500).json({
            message: 'Error encountered: ' + err,
          });
        });
    });
    input.pipe(parser).pipe(transform);
  }

  static importShift(req, res, next) {
    const input = fs.createReadStream(req.file.path);
    const parser = csv.parse({
      delimiter: ',',
      columns: true,
    });

    const transform = csv.transform(function (row) {
      const resultObj = {
        employeeId: row.employeeId,
        shiftId: row.shiftId,
        date: row.date,
        desc: row.desc,
      };
      Shift.create(resultObj)
        .then(function () {
          res.status(200).json({
            message: 'Shift data has been successfuly recorded',
          });
        })
        .catch(function (err) {
          res.status(500).json({
            message: 'Error encountered: ' + err,
          });
        });
    });
    input.pipe(parser).pipe(transform);
  }
}

module.exports = ImportController;
