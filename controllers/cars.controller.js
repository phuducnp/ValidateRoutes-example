const Car = require('../models/car.model');
const User = require('../models/user.model');

module.exports = {
    index: async (req, res, next) => {
        const cars = await Car.find({});
        return res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        try {
            const seller = await User.findById(req.value.body.seller);

            const newCar = req.value.body;
            delete newCar.seller;

            const car = new Car(newCar);
            car.seller = seller;
            await car.save();

            seller.cars.push(car);
            await seller.save();

            return res.status(200).json(car);
        } catch (error) {
            return next(error);
        }
    },

    getCar: async (req, res, next) => {
        try {
            const car = await Car.findById(req.value.params.carId);
            return res.status(200).json(car);
        } catch (error) {
            return next(error);
        }
    },

    replaceCar: async (req, res, next) => {
        try {
            const { carId } = req.value.params;
            const newCar = req.value.body;

            const result = await Car.findByIdAndUpdate(carId, newCar);
            return res.status(200).json({ success: true });
        } catch (error) {
            return next(error);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.value.params;
            const newCar = req.value.body;
            const result = await Car.findByIdAndUpdate(carId, newCar);
            return res.status(200).json({ success: true });

        } catch (error) {
            return next(error);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.value.params;
            const car = await Car.findById(carId);
            if (!car) {
                return res.status(404).json({ error: 'Car does not exist'});
            }
            const sellerId = car.seller;
            const seller = await User.findById(sellerId);
            await car.remove();
            seller.cars.pull(car);
            await seller.save();
            return res.status(200).json({ success: true });
        } catch (error) {
            return next(error);
        }
    }
}