const Car = require('../models/Car')


async function getAll() {
    return Car.find({})
};

async function getByUserId(userId) {
    return Car.find({ _ownerId: userId })

};
async function getById(id) {
    return Car.findById(id).populate('_ownerId', 'likes')
};

async function create(data) {
    return Car.create(data)
};

async function update(id, car) {
    const existing = await Car.findById(id);

    existing.brand = car.brand;
    existing.model = car.model;
    existing.year = car.year;
    existing.power = car.hp;
    existing.price = car.price;
    existing.img = car.imageUrl;
    existing.color = car.color
    return existing.save()
}

async function deleteById(id) {
    return Car.findByIdAndDelete(id)
};

async function getMyCars(id) {
    return await Car.find({ _ownerId: id })
}

async function likeCar(carId, userId) {
    const existing = await Car.findById(carId)
    existing.likes.push(userId);
    return existing.save()
}

async function unLikeCar(carId, userId) {

    const existing = await Car.findById(carId);
    const indexToRemove = existing.likes.findIndex(x => x === userId)

    existing.likes.splice(indexToRemove, 1);
    return existing.save();
}

async function getMyLikes(id) {
    const cars = await Car.find({})
    let arr = [];
    cars.map(x => {
        if (!!(x.likes.includes(id))) {
            arr.push(x)
        }
    })
    return arr;

}


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByUserId,
    getMyCars,
    likeCar,
    getMyLikes,
    unLikeCar
}