const express = require('express');
const router = express.Router();
const { FlightMiddlewares } = require('../../middlewares/index');

const cityController = require('../../controllers/city-controller');
const FlightController = require('../../controllers/flight-controller');

router.post('/city', cityController.create);
router.delete('/city/:id', cityController.destroy);
router.get('/city/:id', cityController.get);
router.get('/city', cityController.getAll);
router.patch('/city/:id', cityController.update);

router.post(
    '/flights', 
    FlightMiddlewares.validateCreateFlight, 
    FlightController.create
);
router.get('/flights', FlightController.getAll);
router.get('/flights/:id', FlightController.get);
router.patch('/flights/:id', FlightController.update);

module.exports = router;