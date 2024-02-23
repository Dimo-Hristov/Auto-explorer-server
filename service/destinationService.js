const Destination = require('../models/Destination')


async function getAll() {
    return Destination.find({})
};

async function getByUserId(userId) {
    return Destination.find({ _ownerId: userId })

};
async function getById(id) {
    return Destination.findById(id).populate('_ownerId', 'likes')
};

async function create(data) {
    return Destination.create(data)
};

async function update(id, destination) {
    const existing = await Destination.findById(id);

    existing.destination = destination.destination;
    existing.description = destination.description;
    existing.imageUrl = destination.imageUrl;
    existing.type = destination.type;
    return existing.save()
}

async function deleteById(id) {
    return Destination.findByIdAndDelete(id)
};

async function getMyDestinations(id) {
    return await Destination.find({ _ownerId: id })
}

async function likeDestination(destinationId, userId) {
    const existing = await Destination.findById(destinationId)
    existing.likes.push(userId);
    return existing.save()
}

async function unLikeDestination(destinationId, userId) {

    const existing = await Destination.findById(destinationId);
    const indexToRemove = existing.likes.findIndex(x => x === userId)

    existing.likes.splice(indexToRemove, 1);
    return existing.save();
}

async function getMyLikes(id) {
    const destinations = await Destination.find({})
    let arr = [];
    destinations.map(x => {
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
    getMyDestinations,
    likeDestination,
    getMyLikes,
    unLikeDestination,
}