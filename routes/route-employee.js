const router = require('express').Router();
const { EmployeeController } = require('../controllers');
const { isAdminAuthenticated } = require('../middlewares/auth');

router.post('/login', EmployeeController.login);
router.post('/', isAdminAuthenticated, EmployeeController.addEmployee);
router.get('/', isAdminAuthenticated, EmployeeController.getEmployees);
router.get('/:id', isAdminAuthenticated, EmployeeController.findOneEmployee);
router.put('/:id', isAdminAuthenticated, isAdminAuthenticated, EmployeeController.editEmployee);
router.delete('/:id', isAdminAuthenticated, EmployeeController.deleteEmployee);

// router.put('/shift/:id', isAdminAuthenticated, EmployeeController.updateShiftEmployee);
// router.post('/shift', isAdminAuthenticated, EmployeeController.updateShiftMultipleEmployees);

module.exports = router;
