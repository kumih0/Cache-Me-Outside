const router = require('express').Router();
const { FoundCaches, User, Caches } = require('../../models');
const withAuth = require('../../utils/auth')

//GET all found caches for test in insomnia
router.get('/', async (req, res) => {
    try {
        const foundCacheData = await FoundCaches.findAll(
            {include: {model: User, Caches}}
        );
    
        const foundCaches = foundCacheData.map((foundCaches) =>
        foundCaches.get({ plain: true })
        );
        console.log("u done it stupid");
        res.status(200).json(foundCaches);
    } catch (err) {
        console.log("u idiot u broke it", err);
        res.status(500).json(err);
    }
});

//GET all found caches for a specific user
router.get('/user/:id', async (req, res) => {
    try {
        const foundCacheData = await FoundCaches.findAll({
            where: {finder_id: req.params.id},
            include: {model: User, Caches}});
    
        const foundCaches = foundCacheData.map((foundCaches) =>
        foundCaches.get({ plain: true })
        );
        console.log(`u got all found caches for user #${req.params.id}`);
        res.status(200).json(foundCaches);
    } catch (err) {
        console.log("u broke it u moron", err);
        res.status(500).json(err);
    }
});

module.exports = router;