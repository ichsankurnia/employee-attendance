const router = require('express').Router();
const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const attendanceRoutes = require('./attendance');

const controllerShift = require('../controllers/shift')
const { isAdminAuthenticated } = require('../middlewares/auth');

router.get('/', (req,res) => {
  res.send('Welcome to HRIS - Air Indonesia API 🚀');
});
router.use('/admins', adminRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendances', attendanceRoutes);

router.get('/shift/sync', isAdminAuthenticated, controllerShift.getAllShift)
router.post('/shift/new', isAdminAuthenticated, controllerShift.createNewShift)
router.put('/shift/modify/:id', isAdminAuthenticated, controllerShift.updateShift)
router.delete('/shift/remove/:id', isAdminAuthenticated, controllerShift.deleteShift)
router.delete('/shift/truncate', isAdminAuthenticated, controllerShift.truncateShift)

module.exports = router;
