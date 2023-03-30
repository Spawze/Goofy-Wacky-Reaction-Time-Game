var logoutEl = $('.logout-button')
//logs user out and puts them on the home page
function logout(){
    console.log("Eeeeeeeeeeeeeeeee")
    const response = $.post('/api/user/logout', (data)=>{

        document.location.replace('/')})

        .fail((data)=>console.log("Error",data))
}

logoutEl.on('click', logout)