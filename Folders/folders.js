

{/* <i class=" dots fa-solid fa-ellipsis-vertical"></i> */}
const constants = {
  apiBasePath: 'https://localhost:44366/api/'
}
var id=sessionStorage.getItem("id");
console.log(id);
var adminname=sessionStorage.getItem("name");
console.log(adminname);


var curr=new Date();
	// var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":" 
	// + curr.getMinutes() + ":" + curr.getSeconds();
const form = document.getElementById("folderr");
console.log(form);

function createfolder() {
  try
  {
   fetch('https://localhost:44366/api/Folder', {
     body: JSON.stringify({
      
      "folderName": form.value,
        "createdBy": id,
        "createdAt": curr.toISOString(),
        "isDeleted": 0
    }),
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
    },
   }).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
       listFolders();
   });
  }
  catch(err)
  {
    console.log(err);
  }
}

function listFolders() {
  try
  {
    var create = document.getElementById("create");
    create.innerHTML = '';
  fetch(`${constants.apiBasePath}/Folder/`+sessionStorage.getItem("id"), {
    method: 'GET'
  })
  .then(response => response.json())
  .then((folders) => {
    // console.log(folders);
    folders.forEach(folder => {
  
    var create = document.getElementById("create");
    var art = document.createElement("article");
    art.setAttribute("class", "clickable");
    const fold = folder.folderName;
    const folderId=folder.folderId;
    console.log(folderId);
    art.innerHTML = `  <div class="divfolder" onclick="openfile(${folderId}") >

   
    <i class="fa-regular fa-star star " id="icon"  onclick="favorites(${folderId})"></i>

   

    <i class='fa-solid folder fa-2x fa-folder-closed'> </i>
    
    
    
    
    <label class="dropdown"> 
    <div class=" dropdowndiv dd-button">
      <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
     
     </div>
    
     <input type="checkbox" class="dd-input" id="test">
    
     <ul class=" menulist dd-menu">
       <li class="menuu" ><button id="viewdetails"  type="button" onclick="viewDetail(${fold})"><span class ="trigger"> <button id="viewdetails" " type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">

       View details
       
        </button> </span></button></li>
      
       <li class="divider"></li>
       
       <li class="menuu" > <button id="viewdetails" type="button""><a style="text-decoration:none" href="#myModal" class="trigger-btn" data-toggle="modal">Delete the folder</a></button></li>
       <li class="divider"></li>
       <li class="menuu" onclick="favorites(${folderId})"><span clas="trigger"  id="favorites"> Add to Favourites</span>
       </li>
       
     </ul>
     
     
      
    </label> 
    
    
      
    <button onclick="openfile(${folderId})" class="folderName">${fold}</button>
   
    
  

    
    
    ` ;
    

    create.appendChild(art);
    });
  })
  
  }
  catch(err)
  {
    console.log(err);
  }
}
function openfile(folderId) {
  sessionStorage.setItem("folderId",folderId);
  window.location.href="/Files/file.html";
}

function onLoad() {
  listFolders();
  document.getElementById("admin").innerHTML=adminname;
}
onLoad();
let logou = document.getElementById("logoutbtn");
function logout() {
  window.location.href = "index.html";
  sessionStorage.clear();
}

function searchItem() {

   

  var val=document.getElementById("search1");
  console.log(val.value);

  var url="https://localhost:44366/Folder/"+val.value+","+id;

  fetch(url)

  .then((res) => res.json())
  .then((folders) => {
    folders.forEach(folder => {
      var create = document.getElementById("create");
      create.innerHTML = '';
  
    var create = document.getElementById("create");
    var art = document.createElement("article");
    const fold = folder.folderName;
    const folderId=folder.folderId;
    art.innerHTML = `
    <div>
    <label class="dropdown"></i>
    <i class="fa-solid fa-folder-open"></i>
  

    <div class=" dropdowndiv dd-button">
     <i class=" dots fa-solid fa-ellipsis-vertical"> 1: </i> 
    
    </div>
  
    <input type="checkbox" class="dd-input" id="test">
  
    <ul class=" menulist dd-menu">
      <li class="menuu" ><button id="viewdetails"  type="button" onclick="viewDetail(${folderId})" >view details</button></li>
     
      <li class="divider"></li>
      
      <li class="menuu" > <button id="viewdetails" type="button" onclick="sendToTrash(${folderId})" >Delete  Folder</button></li>
      
    </ul>
     
  </label>
<button onclick=openfile(${folderId}) style="font-size:   40px; color: black; text-decoration: none;position: relative;left: 20px;bottom: 20px;cursor: pointer;">${fold}</button>

</div>`;
    create.appendChild(art);
    });
  })
}


const folde = document.getElementById("idfolder");
console.log(folde);


// VIEWDETAILS
 function viewDetail(fold) {
   
console.log(fold);
fetch('https://localhost:44366/api/Folder/details/'+ fold )
.then(response=>response.json())
.then(result=>{
    alert("Folder id:"+result.folderId + 
    "\nFolder Name:"+ result.folderName+
    "\nCreated By:"+ result.createdBy+
    "\nCreated At:"+result.createdAt
)
 })
}



function favorites(folderIds) {
  debugger; 
    console.log(folderIds);
   
  
  const grid = document.getElementById('icon');
  const fav = document.getElementById("favorites");
  console.log(fav);
  
  console.log(grid);
  if(grid.className == "fa-regular fa-star star ")
  {
    grid.setAttribute('class' , "fa-solid fa-star star ");
    
    fav.innerHTML= "Remove from Favorites"; 
    addToFavourites(folderIds);
    
  }
  else if ( grid.className == "fa-solid fa-star star ")
  {
    grid.setAttribute("class" , "fa-regular fa-star star");
    
    fav.innerHTML = "Add to Favorites";
    removefromfav(folderIds);
  }
 
  
  }

//  

// const grid = document.getElementsByClassName('gridview');


  function gridchange() {
   
    const grid = document.getElementById('create');
    console.log(grid);
    if(grid.className == "grid")
    {
      grid.setAttribute('class' , "flex");
      return;
    }
    else if ( grid.className == "flex")
    {
      grid.setAttribute("class" , "grid");
    }
    else
    {

    }
    }


    function sendToTrash(folderId){
      debugger;
      
  var requestOptions = {
    method: 'PUT',
    redirect: 'follow'
  };
  
  fetch("https://localhost:44366/api/Folder/SoftDeleted/"+folderId, requestOptions)
    .then(response => response.text())
    .then(result =>{
      console.log(result)
      listFolders()})
    .catch(error => console.log('error', error));
}

function addToFavourites(folderId){
  
var requestOptions = {
method: 'PUT',
redirect: 'follow'
};

fetch("https://localhost:44366/api/Folder/favourite/"+folderId, requestOptions)
.then(response => response.text())
.then(result =>{

  listFolders()})
.catch(error => console.log('error', error));
}
function visibility()
{

  const visible = document.getElementById('span');
  const visible2 = document.getElementById('span1');
  
  visible.setAttribute('class', 'visible');
  visible2.setAttribute('class', 'visible');


}
function removefromfav(folderId) {
  debugger;
  var requestOptions = {
    method: 'PUT',
    redirect: "follow"
  };
  fetch("https://localhost:44366/api/Folder/Removefav/"+ folderId, requestOptions)
  .then(response =>response.text())
  .then(result => {
    listFolders()
  }).catch(error=>console.log('error', error));
}

// Add a descrption
function Descption()
{
  
  const pen = document.getElementById("seeinput");
  console.log(pen); 
  pen.innerHTML =`<input type="text placeholder="Descption">`;
}


// 
//responsive
// const html = document.documentElement;
// const body = document.body;
// const menuLinks = document.querySelectorAll(".admin-menu a");
// const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
// const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
// const switchInput = document.querySelector(".switch input");
// const switchLabel = document.querySelector(".switch label");
// const switchLabelText = switchLabel.querySelector("span:last-child");
// const collapsedClass = "collapsed";
// const lightModeClass = "light-mode";

//TOGGLE HEADER STATE/
// collapseBtn.addEventListener("click", function () {
//   body.classList.toggle(collapsedClass);
//   this.getAttribute("aria-expanded") == "true"
//     ? this.setAttribute("aria-expanded", "false")
//     : this.setAttribute("aria-expanded", "true");
//   this.getAttribute("aria-label") == "collapse menu"
//     ? this.setAttribute("aria-label", "expand menu")
//     : this.setAttribute("aria-label", "collapse menu");
// });

//TOGGLE MOBILE MENU/
// toggleMobileMenu.addEventListener("click", function () {
//   body.classList.toggle("mob-menu-opened");
//   this.getAttribute("aria-expanded") == "true"
//     ? this.setAttribute("aria-expanded", "false")
//     : this.setAttribute("aria-expanded", "true");
//   this.getAttribute("aria-label") == "open menu"
//     ? this.setAttribute("aria-label", "close menu")
//     : this.setAttribute("aria-label", "open menu");
// });

//SHOW TOOLTIP ON MENU LINK HOVER/
// for (const link of menuLinks) {
//   link.addEventListener("mouseenter", function () {
//     if (
//       body.classList.contains(collapsedClass) &&
//       window.matchMedia("(min-width: 768px)").matches
//     ) {
//       const tooltip = this.querySelector("span").textContent;
//       this.setAttribute("title", tooltip);
//     } else {
//       this.removeAttribute("title");
//     }
//   });
// }

//TOGGLE LIGHT/DARK MODE/
// if (localStorage.getItem("dark-mode") === "false") {
//   html.classList.add(lightModeClass);
//   switchInput.checked = false;
//   switchLabelText.textContent = "Light";
// }

// switchInput.addEventListener("input", function () {
//   html.classList.toggle(lightModeClass);
//   if (html.classList.contains(lightModeClass)) {
//     switchLabelText.textContent = "Light";
//     localStorage.setItem("dark-mode", "false");
//   } else {
//     switchLabelText.textContent = "Dark";
//     localStorage.setItem("dark-mode", "true");
//   }
// });


// toogle menu
// const clickable = document.getElementById('clickable')
// const menu = document.getElementById('menu')
// const outClick = document.getElementById('out-click')

// clickable.addEventListener('contextmenu', e => {
//   e.preventDefault()

//   menu.style.top = `${e.clientY}px`
//   menu.style.left = `${e.clientX}px`
//   menu.classList.add('show')

//   outClick.style.display = "block"
// })

// outClick.addEventListener('click', () => {
//   menu.classList.remove('show')
//   outClick.style.display = "none"
// })
// modal

// var modal = document.querySelector(".modal");
// var trigger = document.querySelector(".trigger");
// var closeButton = document.querySelector(".close-button");

// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }

// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleModal();
//     }
// }

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);


// view details 


function viewdetail(fooldername){
  debugger;
 
  const owner = document.getElementById("Owner");

  const foldername = document.getElementById('foldername');
  foldername.innerHTML = `Foldername: ${fooldername} `;
  const createdby = document.getElementById("createdby");
  const createdAt = document.getElementById("Modified");
  console.log(owner,foldername, createdAt, createdby);
}

 
const clickable = document.getElementsByClassName("clickable");
console.log(clickable);
const menu = document.getElementsByClassName('menu');
console.log(menu);

const outClick = document.getElementsByClassName('out-click');
console.log(outClick);

clickable.addEventListener('contextmenu', e => {
  e.preventDefault()

  menu.style.top = `${e.clientY}px`
  menu.style.left = `${e.clientX}px`
  menu.classList.add('show')

  outClick.style.display = "block"
})

outClick.addEventListener('click', () => {
  menu.classList.remove('show')
  outClick.style.display = "none"
})

