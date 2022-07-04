


// password correction
function checkPassword() {
    let password = document.getElementById("password").value;
    let cnfrmpassword = document.getElementById("passwordConfirmation").value;
    console.log(password , cnfrmpassword);
    let message = document.getElementById('message');

    if(password.length != 0) {
        
        if(password == cnfrmpassword) {
            debugger;
            message.textContent = "password match"
            message.style.backgroundColor= "green";
            checkUser();
        }
        else {
        message.textContent = "password don't match";
        message.style.backgroundColor ="red";
        }
    }
 }



function checkUser()
{ 
	debugger;
	let user=document.getElementById("username").value;
	let password=document.getElementById("password").value;

	var request={
		method:'POST',
		body: JSON.stringify({
			"Username": user,
			"Password": password,
		}),
		 
		// Adding headers to the request
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		
	}; try{
		
	fetch("https://localhost:44366/api/Login", request)
	.then( res=>res.json())
	    .then(data=> showstorage(data))
	}
catch(error){
	alert('you are not valid');
}


};

function showstorage(data)
{
if(data.token!=null && data.token!=undefined && data.token!="")
{   
	console.log(data);
	sessionStorage.setItem("token",data.token);
	sessionStorage.setItem("id",data.id);
	sessionStorage.setItem("name",data.name);
}
loc();

}
function loc()
{
	
if(sessionStorage.getItem("token")!=null)
{
window.location.href="/Folders/folders.html";

}
else

{

alert("Login Credentials are wrong");

}

}


//open loginpage
 async function openpage() {
 	window.location.href = 'folders.html';
}

