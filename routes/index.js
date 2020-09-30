const router = require('express').Router();
const adminRoutes = require('./route-admin');
const employeeRoutes = require('./route-employee');
const attendanceRoutes = require('./route-attendance');
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const controllerShift = require('../controllers/controller-shift');
const controllerSchedule = require('../controllers/controller-schedule');
const importController = require('../controllers/controller-import');
const { isAdminAuthenticated } = require('../middlewares/auth');

router.get('/', (req,res) => {
  res.send('Welcome to HRIS - PT. AIR Indonesia API 🚀');
});

router.post('/import-employee', upload.single('file'), importController.importEmployee);
router.post('/import-shift', upload.single('file'), importController.importShift);

router.use('/admins', adminRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendances', attendanceRoutes);

router.get('/shift/sync', isAdminAuthenticated, controllerShift.getAllShift)
router.post('/shift/new', isAdminAuthenticated, controllerShift.createNewShift)
router.post('/shift/insert-many', isAdminAuthenticated, controllerShift.insertManyShift)
router.put('/shift/modify/:id', isAdminAuthenticated, controllerShift.updateShift)
router.delete('/shift/remove/:id', isAdminAuthenticated, controllerShift.deleteShift)
router.delete('/shift/truncate', isAdminAuthenticated, controllerShift.truncateShift)

router.get('/schedule/sync-all', isAdminAuthenticated, controllerSchedule.getAllSchedule)
router.get('/schedule/sync-all/:employee_id', isAdminAuthenticated, controllerSchedule.getAllSchedulebyEmployeId)
router.get('/schedule/sync-today', isAdminAuthenticated, controllerSchedule.getAllScheduleToday)
router.get('/schedule/sync-today/:employee_id', isAdminAuthenticated, controllerSchedule.getScheduleEmployeIdAndToday)
router.get('/schedule/sync-date/:date', isAdminAuthenticated, controllerSchedule.getAllScheduleByDate)
router.get('/schedule/sync-date/:date/:employee_id', isAdminAuthenticated, controllerSchedule.getScheduleEmployeIdAndDate)
router.post('/schedule/new', isAdminAuthenticated, controllerSchedule.addSchedule)

router.put('/schedule/modify/:date', isAdminAuthenticated, controllerSchedule.updateScheduleEmployeeByDate);

module.exports = router;
