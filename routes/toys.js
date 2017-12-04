const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const { ToysController } = require('../controllers/index');


const router = express.Router();
const controller = new ToysController();


router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
  console.log(`req.body=${util.inspect(req.body)}`);
  next();
});

router
  .get('/toys', controller.index)
  .get('/toys/new', controller.new)
  .get('/toys/:id', controller.show)
  .get('/toys/edit/:id',controller.edit)
  .post('/toys/update/:id',controller.update)
  .post('/toys/delete/:id', controller.delete)
  .post('/toys', controller.create);

module.exports = router;
