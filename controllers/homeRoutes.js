const router = require('express').Router();
const { User, Score } = require('../models')
const _ = require('lodash')


router.get('/', async (req, res) => {
    try {
        res.render('homepage', { logged_in: req.session.logged_in })
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return;
    }

    res.render('login')
});

router.get('/leaderboard', async (req, res) => {
    try {
        //get all score data, include username associated, and sort by descending
        const scoreDataRaw = await Score.findAll({

            distinct: true,
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['score', 'ASC']
            ],
        })
        //clean data
        const scoreData = scoreDataRaw.map((score) => score.get({ plain: true }))
        //filter data, using the Lodash library, to exclude duplicate user id's
        const scoreDataFiltered = _.uniqBy(scoreData, 'user_id')
        //cut the filtered data to only have 15 entries
        const scoreDataCut = scoreDataFiltered.slice(0, 15)

        res.render('leaderboard', { scoreData: scoreDataCut, logged_in: req.session.logged_in })

    } catch (error) {
        res.status(500).json(error);
    }
});

//render game screen. Will redirect to login page if user isn't logged in.
router.get('/game', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('game', { logged_in: req.session.logged_in })
        } else {
            res.redirect('login')
        }

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;