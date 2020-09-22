const router = require('express').Router();
const { EmployeeController } = require('../controllers');
const { isAdminAuthenticated } = require('../middlewares/auth');

router.post('/login', EmployeeController.login);
router.post('/', EmployeeController.addEmployee);
router.get('/', EmployeeController.getEmployees);
router.get('/:id', EmployeeController.findOneEmployee);
router.patch('/:id', isAdminAuthenticated, EmployeeController.editEmployee);
router.delete('/:id', isAdminAuthenticated, EmployeeController.deleteEmployee);
router.post('/shift/:id', EmployeeController.updateShiftEmployee);

module.exports = router;
