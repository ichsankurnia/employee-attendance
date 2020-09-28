const { Employee, Shift } = require('../models');
const { BcryptHelper, JWTHelper } = require('../helpers');

class EmployeeController  {
  static async login(req, res, next) {
    try {
      const input = {
        username: req.body.username,
        password: req.body.password
      }
  
      const employee = await Employee.findOne({
        where: {
          username: input.username
        }
      });

      if (employee) {
        const isValid = BcryptHelper.validatePassword(input.password, employee.password);

        if (isValid) {
          const payload = {
            id: employee.id,
            username: employee.username
          }

          const access_token = JWTHelper.signToken(payload);

          return res.status(200).json({
            code: 0,
            message: 'Login success',
            access_token,
            data: employee
          });
        } else {
          return next({
            status: 400,
            name: 'LoginFailed',
            message: 'Email / password is incorrect'
          });
        }
      } else {
        return next({
          status: 400,
          name: 'LoginFailed',
          message: 'Email / password is incorrect'
        });
      }

      
    } catch (err) {
      return next(err);
    }
  }

  static async addEmployee(req, res, next) {
    try {
      const input = {
        nik: req.body.nik,
        name: req.body.name,
        position: req.body.position,
        username: req.body.username,
        password: req.body.password,
        shiftId: 1
      }

      const employee = await Employee.create(input);

      const payload = {
        id: employee.id,
        nik: employee.nik,
        position: employee.position,
        username: employee.username,
        shiftId: 1,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt
      }

      return res.status(201).json(payload);
    } catch (err) {
      return next(err);
    }
  }

  static async getEmployees(req, res, next) {
    try {
      const employee = await Employee.findAll({
        order: [
          ['id', 'ASC']
        ],
        attributes : ["id","nik", "name", "position", "username", "shiftId"],
            include: [
              {
                model : Shift,
                as: "shifts",
                attributes : ["shift_name","shift_desc", "min_check_in", "max_check_in", "min_check_out", "max_check_out"]
              },
            ]
      });

      return res.status(200).json(employee);
    } catch (err) {
      return next(err);
    }
  }

  static async findOneEmployee(req, res, next) {
    try {
      const id = +req.params.id;

      const employee = await Employee.findByPk(id);

      if (employee) {
        return res.status(200).json(employee);
      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Employee not found'
        });
      }

      
    } catch (err) {
      return next(err)
    }
    
  }

  static async editEmployee(req, res, next) {
    try {
      const id = +req.params.id
      const input = {
        nik: req.body.nik,
        name: req.body.name,
        position: req.body.position,
        username: req.body.username,
        password: req.body.password
      }
      
      const employee = await Employee.findByPk(id);

      if (employee) {
        const updateEmployee = await Employee.update(input, {
          where: {
            id
          }, returning: true
        });

        return res.status(200).json({ message: 'Employee has updated successfully' });
      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const id = +req.params.id;

      const employee = await Employee.destroy({
        where: {
          id
        }
      });

      if (employee) {
        return res.status(200).json({ message: 'Employee has deleted successfully' });
      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      return next(err);
    }
  }


  static async updateShiftEmployee(req, res, next) {
    try {
      const { id } = req.params
      const { shift_id } = req.body
      
      const employee = await Employee.findOne({where: {id: id}});

      if (employee) {
        const updateEmployee = await Employee.update({shiftId: shift_id}, {
          where: {
            id: id
          }, returning: true
        });
        

        if(updateEmployee){
          const data = await Employee.findOne(
            {
              where: { id: id },
              attributes : ["id","nik", "name", "position", "username", "shiftId"],
              include: [
                {
                  model : Shift,
                  as: "shifts",
                  attributes : ["shift_name","shift_desc", "min_check_in", "max_check_in", "min_check_out", "max_check_out"]
                },
              ]
            })
          return res.status(200).json({code: 0, message: 'Employee Shift has updated successfully', data: data });
        }else{
          return next({
            status: 404,
            name: 'Fail',
            message: 'Update employe shift failed'
          });
        }
      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Employee not found'
        });
      }
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

  static async updateShiftMultipleEmployees(req, res, next) {
    try {
      const { shift_id, list_employees } = req.body
      
      if(list_employees.length > 0){

        await Promise.all(list_employees.map(async (element) => {
          await Employee.update({shiftId: shift_id}, {where : {id: element.employee_id}})
        }))

        const data = await Employee.findAll(
          {
            attributes : ["id","nik", "name", "position", "username", "shiftId"],
            include: [
              {
                model : Shift,
                as: "shifts",
                attributes : ["shift_name","shift_desc", "min_check_in", "max_check_in", "min_check_out", "max_check_out"]
              },
            ]
          })
        return res.status(200).json({code: 0, message: 'Multiple employee Shift has updated successfully', data: data });

      } else {
        return next({
          status: 404,
          name: 'NotFound',
          message: 'Employee not found'
        });
      }
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

}

module.exports = EmployeeController;
