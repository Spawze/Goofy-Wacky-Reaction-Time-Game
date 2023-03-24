const router = require('express').Router();
const { User, Score } = require('../models')

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {})
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/leaderboard', async (req, res) => {
    try {
        //get all score data, include username associated, and sort by descending
        const scoreDataRaw = await Score.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['score', 'ASC']
            ]
        })

        //clean data
        const scoreData = scoreDataRaw.map((score) => score.get({plain: true}))

        console.log(scoreData)

        

        res.render('leaderboard', {scoreData})
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;