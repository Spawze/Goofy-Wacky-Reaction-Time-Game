const router = require('express').Router()
const {Score, User} = require('../../models')


//create a new score
//in body needs:
//score
router.post('/', async (req,res)=>{
    try {
        const newScore = await Score.create({score: req.body.score, user_id: req.session.user_id})

        res.status(200).json(newScore)
    } catch (error) {
        res.status(400).json(error)
    }
})

//delete a score
//in body needs:
//id
router.delete('/', async (req, res)=>{
    try {
        await Score.destroy({
            where: {
                id : req.body.id
            }
        })
    }catch (error){
        res.status(400).json(error)
    }
})

module.exports = router