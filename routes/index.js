const router = require('express').Router();
const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const attendanceRoutes = require('./attendance');

const controllerShift = require('../controllers/shift')

router.get('/', (req,res) => {
  res.send('Welcome to HRIS - Air Indonesia API 🚀');
});
router.use('/admins', adminRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendances', attendanceRoutes);

router.get('/shift/sync', controllerShift.getAllShift)
router.post('/shift/new', controllerShift.createNewShift)
router.put('/shift/modify/:id', controllerShift.updateShift)
router.delete('/shift/remove/:id', controllerShift.deleteShift)
router.delete('/shift/truncate', controllerShift.truncateShift)

module.exports = router;
