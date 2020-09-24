const router = require('express').Router();
const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const attendanceRoutes = require('./attendance');
const fs = require('fs');
const multer = require('multer');
const csv = require('csv');
const upload = multer({ dest: 'tmp/csv/' });
const { Employee } = require('../models');

const controllerShift = require('../controllers/shift')
const { isAdminAuthenticated } = require('../middlewares/auth');


router.post('/upload-csv', upload.single('file'), function (req, res) {
  var input = fs.createReadStream(req.file.path);
  var parser = csv.parse({
      delimiter: ',',
      columns: true
  });

  var transform = csv.transform(function(row) {
      var resultObj = {
        nik: row.nik,
        name: row.name,
        position: row.position,
        username: row.username,
        password: row.password,
        shiftId: row.shiftId
      }
      console.log(resultObj)
      Employee.create(resultObj)
          .then(function() {
            res.status(200).json({
              message: 'Record created'
            })
          })
          .catch(function(err) {
            res.status(500).json({
              message: 'Error encountered: ' + err
            })
          })
  })

  input.pipe(parser).pipe(transform)
});


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
