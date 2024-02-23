const carsController = require('express').Router();

const { getAll, create, getById, update, deleteById, getByUserId, getMyCars, likeCar, getMyLikes, unLikeCar } = require('../service/carService');


carsController.get('/', async (req, res) => {
    try {
        const cars = await getAll();
        res.status(200).json(cars)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

carsController.get('/my-cars', async (req, res) => {
    const cars = await getByUserId(req.user._id);
    res.status(200).json(cars)
});

carsController.post('/', async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body)
        const cars = await create(data);
        //todo error
        res.json(cars)
    } catch (error) {
        // const message = parseError(err)
        console.log(error);
        res.status(400).json({ error: error.message })
    }
    res.end()
});

carsController.get('/my-likes', async (req, res) => {

    try {
        const cars = await getMyLikes(req.user._id)
        return res.status(200).json(cars)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})

carsController.get('/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id)
        if (!car) {
            throw new Error('Car does not exist')

        }
        return res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ error })

    }
});

carsController.put('/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id);

        // todo parse token
        if (req.user._id != car._ownerId._id) {
            return res.status(403).json({ message: 'You cannot modify this record' })
        }
        const result = await update(req.params.id, req.body);
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        // const message = parseError(err)
        res.status(400).json({ error: err.message })
    }
});

carsController.get('/mycars', async (req, res) => {
    try {
        const cars = await getMyCars(req.user._id)
        return res.status(200).json(cars)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

carsController.delete('/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id);
        if (req.user._id != car._ownerId._id) {
            return res.status(403).json({ err: err.message })
        }
        await deleteById(req.params.id);
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
});

carsController.get('/like/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (!car.likes.includes(req.user?._id)) {
            try {
                await likeCar(req.params.id, req.user._id);
                const car = await getById(req.params.id)

                return res.status(200).json(car)
            } catch (error) {
                res.status(400).json({ err: error.message })
            }
        }

        if (car.likes.includes(req.user?._id)) {
            try {
                console.log('in');
                await unLikeCar(req.params.id, req.user._id);
                const car = await getById(req.params.id);

                return res.status(200).json(car)
            } catch (error) {

            }
        }

    } catch (error) {
        res.status(400).json({ err: error.message })
        res.status(400).json({ err: error.message })
    }
});




module.exports = {
    carsController
};