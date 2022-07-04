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
            sendData();
        }
        else {
        message.textContent = "password don't match";
        message.style.backgroundColor ="red";
        }
    }
 }


//  signup connection 

function sendData(){
	
	let user=document.getElementById("username").value;
	let password=document.getElementById("password").value;
	var curr=new Date();
	
	var request={
		method:'POST',
		redirect:'follow',
		body: JSON.stringify({
			"username": user,
			"password":password,
			// "password":CryptoJS.MD5(password).toString(),
			"createdAt": curr.toISOString()
		}),
		 
		// Adding headers to the request
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		
	};
	fetch("https://localhost:44366/api/User", request)
	.then(response => response.text())
	.then(result => showNext(result))
	.catch(error => console.log('error', error));}

	function showNext(result){
		
		console.log(result);
		window.location.href="loginn.html";
	}

    // LOGIN AUTHECTION AND GENERATING TOKEN

 