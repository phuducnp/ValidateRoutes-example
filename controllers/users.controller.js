const User = require('../models/user.model');
const Car = require('../models/car.model');

const UserController = {};

UserController.index = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            next(err);
        }
        res.status(200).json({
            success: true,
            users: users
        });
    })

    // res.status(200).json({
    //     message: 'You requested index page'
    // });
}

UserController.create = async (req, res, next) => {
    try {
        const { firstName, lastName, email, cars } = req.value.body;
        const user = new User({
            ...req.value.body
        });
        await user.save();
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);     
    }
}

UserController.getUser = async (req, res, next) => {
    try {
        //const { userId } = req.params;
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error)
    }
}

UserController.replaceUser = async (req, res, next) => {
    // must contain all the field
    try {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        return res.status(200).json({ success: true });
    } catch (error) {
        return next(error);
    }
}

UserController.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        return res.status(200).json({ success: true });
    } catch (error) {
        return next(error);
    }
}

UserController.getUserCars = async (req, res, next) => {
    try {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('cars');
        return res.status(200).json({
            success: true,
            cars: user.cars
        })
    } catch (error) {
        return next(error);
    }
}

UserController.newUserCars = async (req, res, next) => {
    try {
        const { userId } = req.value.params;
        // create new car
        const newCar = new Car(req.value.body);
        
        // user
        const user = await User.findById(userId);
        // assign user as a car's seller
        newCar.seller = user;
       
        await newCar.save();
        // add car to the user's selling array 'cars'
        user.cars.push(newCar);
        await user.save();
        return res.status(200).json({
            success: true,
            newCar
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = UserController;