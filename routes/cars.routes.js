const Router = require('express');
const router = Router();

const CarController = require('../controllers/cars.controller');
const Validator = require('../helpers/routeHelper');

router.route('/')
    .get(CarController.index)
    .post(Validator.validateBody(Validator.schemas.carSchema), CarController.newCar);

router.route('/:carId')
    .get(Validator.validateParam(Validator.schemas.idSchema, 'carId'), CarController.getCar)
    .put([Validator.validateParam(Validator.schemas.idSchema, 'carId'),
          Validator.validateBody(Validator.schemas.putCarSchema)
         ], CarController.replaceCar)
    .patch([Validator.validateParam(Validator.schemas.idSchema, 'carId'),
            Validator.validateBody(Validator.schemas.pathCarSchema),
           ], CarController.updateCar)
    .delete([Validator.validateParam(Validator.schemas.idSchema, 'carId')], CarController.deleteCar);       
    
module.exports = router;