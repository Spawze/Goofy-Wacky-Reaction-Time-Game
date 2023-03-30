# It's Reaction Time!

## About
___________________________________
This project is a reaction time game, how fast are you? This app tests your reaction time by generating a red square and having you click it as soon as you see the square turn green. 

### Deployed URL

https://its-reaction-time.herokuapp.com/

## Summary 
___________________________________
This application provides users the ability to create their own personal accounts using a username and password, this password is kept secure by using bcrypt to hash and authenticate - Having your own account means you're able to save your personal scores without having anyone mess them up! Once the user creates an account and logs in, they are able to play a game of reaction time. The app generates a red block and then randomly changes color to green, as soon as it changes color, you click the block and the app will track how fast you clicked it. The application will save user information a database and use that to display it in the leaderboards. 
This app uses the MVC architecture for structure and utilizes Node JS and Express JS for our server, routes, and to generate our views.

## User Story
____________________________________________________
```
GIVIN I'm slow and need to practice my reaction time
WHEN I open the application
THEN I am presented with a login screen that asks for username and password
GIVEN I do not have an account
THEN I can create a new account
WHEN I am logged in
THEN I am able to hit "start" and the red square will randomly turn green
WHEN the square turns green
THEN I click the square and the app will track how fast I clicked it
WHEN I finish playing
THEN the application will save my score to the database
WHEN I look at the leaderboards
THEN my scores will appear
```




## Main Menu
______________________________________

![Main Menu](/public/images/Main%20Menu.PNG)


## Login Screen
______________________________________

![Login Screen](/public/images/Login%20Screen.PNG)


## Game Screen
_________________________________

![Game Screen](/public/images/Game.PNG)


## Leaderboards
_______________________________

![Leaderboard](/public/images/Leaderboard.PNG)
