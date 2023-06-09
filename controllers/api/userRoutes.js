const router = require('express').Router()
const {User} = require('../../models')

//create a new user
//in body needs:
//username
//email
//password
router.post('/', async (req, res)=>{
    try {
        const userData = await User.create(req.body)

        //set's session to logged in, and returns the user's data to the client
        req.session.save(()=>{
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.status(200).json(userData)
        })
    } catch (error) {
        
        res.status(400).json(error);
    }
})

//login
/*in body needs:
username
password
*/
router.post('/login', async (req, res)=>{
    try {
        const userData = await User.findOne({where: {username: req.body.username}})
        
        if(!userData) {
            //console.log("No matching username")
            res.status(400).json({message: "Incorrect username or password. Please try again."})
            return
        }
        //uses validatePassword from the User class to compare the password from the database to the password sent from client
        const correctPassword = await userData.validatePassword(req.body.password)

        if(!correctPassword) {
            //console.log("Wrong password")
            res.status(400).json({message: "Incorrect username or password. Please try again."})
            return
        }
        
        //Save session as logged in and return user data to client
        req.session.save(()=>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: 'Successfully logged in.'})
        })

    } catch (error) {
        res.status(400).json(error);
    }
})

//logout
//nothing in body
router.post('/logout', async (req, res)=>{
    try {

        //log user out if they are logged in
        if(req.session.logged_in){
            req.session.destroy(()=>{
                res.status(204).end()
            })
        } else {
            //return 404 if the user tries to log out while logged out. (shouldn't be possible)
            res.status(404).json({message: "User already logged out."}).end()
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router