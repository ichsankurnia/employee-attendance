const router = require('express').Router();
const { AttendanceController } = require('../controllers');
const { isAdminAuthenticated, isEmployeeAuthenticated } = require('../middlewares/auth');

router.post('/', isEmployeeAuthenticated, AttendanceController.addAttendance);
router.get('/', isAdminAuthenticated, AttendanceController.getAttendances);
router.delete('/remove/:id', isAdminAuthenticated, AttendanceController.deleteAttendance);
router.delete('/truncate/', isAdminAuthenticated, AttendanceController.truncateAttendance);

module.exports = router;
