var logoutEl = $('#logout-button')

function logout(){
    console.log("Eeeeeeeeeeeeeeeee")
    const response = $.post('/api/user/logout', (data)=>{

        document.location.replace('/')})

        .fail((data)=>console.log("Error",data))
}

logoutEl.on('click', logout)