const router = require('express').Router();
const { AttendanceController } = require('../controllers');
const { isAdminAuthenticated, isEmployeeAuthenticated } = require('../middlewares/auth');

router.post('/', AttendanceController.addAttendance);
router.get('/', AttendanceController.getAttendances);
router.delete('/remove/:id', AttendanceController.deleteAttendance);
router.delete('/truncate/', AttendanceController.truncateAttendance);

module.exports = router;
