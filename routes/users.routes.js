const Router = require('express');
const router = Router();

const { validateParam, validateBody, schemas } = require('../helpers/routeHelper');
const UserController = require('../controllers/users.controller');

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.create);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'), 
          validateBody(schemas.userSchema)], 
          UserController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'), 
            validateBody(schemas.userOptionalSchema)],
            UserController.updateUser)
    .delete();

router.route('/:userId/cars')
    .get(validateParam(schemas.userSchema, 'userId'), UserController.getUserCars)
    .post([validateParam(schemas.idSchema, 'userId'), 
           validateBody(schemas.userCarSchema)],
           UserController.newUserCars);

module.exports = router;