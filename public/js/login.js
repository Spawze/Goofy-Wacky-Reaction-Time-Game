$(() => {
    const loginForm = $('.login-form')
    const signUpForm = $('.signup-form')


    const login = (event) => {
        event.preventDefault()

        const username = $('#username-login').val().trim()
        const password = $('#password-login').val()

        if (username && password) {

            $.post('/api/user/login', { username: username, password: password }, (response) => {
                document.location.replace('/')
            })
            .fail((response)=>{
                console.log(response)
                if(response.status == 400){
                    $('#login-status').text(response.responseJSON.message)
                }
            })
        }


    }

    const signUp = (event) => {
        event.preventDefault()
        const regStatusDiv = $('#registration-status')
        regStatusDiv.empty()

        const username = $('#username-signup').val().trim()
        const email = $('#email-signup').val().trim()
        const password = $('#password-signup').val()

        if(username && email && password){

            $.post('/api/user/', {username: username, email: email, password: password}, (response) =>{

                document.location.replace('/')
                
            })
            .fail((response)=>{
                
                if(response.status = 400){
                    let registrationError

                    //this loop will print the registration  errors, like too short password, or invalid email, below the register button.
                    for(let i = 0; i < response.responseJSON.errors.length; i++){
                        registrationError = response.responseJSON.errors[i].message
                        regErrorEl = $(`<p>${registrationError}</p>`)

                        regStatusDiv.append(regErrorEl)
                    }
                }
            })
        }
    }

    loginForm.on('submit', login)
    signUpForm.on('submit', signUp)
})