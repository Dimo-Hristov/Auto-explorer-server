const destinationsController = require('express').Router();

const { getAll, create, getById, update, deleteById, getByUserId, getMydestinations, likeDestination, getMyLikes, unLikeDestiation } = require('../service/destinationService');


destinationsController.get('/', async (req, res) => {
    try {
        const destinations = await getAll();
        res.status(200).json(destinations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

destinationsController.get('/my-destinations', async (req, res) => {
    const destinations = await getByUserId(req.user._id);
    res.status(200).json(destinations)
});

destinationsController.post('/', async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body)
        const destinations = await create(data);
        //todo error
        res.json(destinations)
    } catch (error) {
        // const message = parseError(err)
        console.log(error);
        res.status(400).json({ error: error.message })
    }
    res.end()
});

destinationsController.get('/my-likes', async (req, res) => {

    try {
        const destinations = await getMyLikes(req.user._id)
        return res.status(200).json(destinations)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})

destinationsController.get('/:id', async (req, res) => {
    try {
        const destination = await getById(req.params.id)
        if (!destination) {
            throw new Error('destination does not exist')

        }
        return res.status(200).json(destination)
    } catch (error) {
        res.status(400).json({ error })

    }
});

destinationsController.put('/:id', async (req, res) => {
    try {
        const destination = await getById(req.params.id);

        // todo parse token
        if (req.user._id != destination._ownerId._id) {
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

destinationsController.get('/mydestinations', async (req, res) => {
    try {
        const destinations = await getMydestinations(req.user._id)
        return res.status(200).json(destinations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

destinationsController.delete('/:id', async (req, res) => {
    try {
        const destination = await getById(req.params.id);
        if (req.user._id != destination._ownerId._id) {
            return res.status(403).json({ err: err.message })
        }
        await deleteById(req.params.id);
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
});

destinationsController.get('/like/:id', async (req, res) => {
    try {
        const destination = await getById(req.params.id);

        if (!destination.likes.includes(req.user?._id)) {
            try {
                await likeDestination(req.params.id, req.user._id);
                const destination = await getById(req.params.id)

                return res.status(200).json(destination)
            } catch (error) {
                res.status(400).json({ err: error.message })
            }
        }

        if (destination.likes.includes(req.user?._id)) {
            try {
                console.log('in');
                await unLikeDestiation(req.params.id, req.user._id);
                const destination = await getById(req.params.id);

                return res.status(200).json(destination)
            } catch (error) {

            }
        }

    } catch (error) {
        res.status(400).json({ err: error.message })
        res.status(400).json({ err: error.message })
    }
});




module.exports = {
    destinationsController
};