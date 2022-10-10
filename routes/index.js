const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const blankRoutes = require('./blankRoutes');

router.use('/', homeRoutes);
router.use('/blank', blankRoutes);

module.exports = router;
