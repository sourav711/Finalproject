var sess=sessionStorage.getItem("id");
console.log(sess);
function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
      var url='https://localhost:44366/api/Folder/Recent/'+sess+'/1';
      console.log(url);
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      // console.log(folders);
      folders.forEach(folder => {
    console.log("hello");
      var create = document.getElementById("create");
      var art = document.createElement("article");
      art.setAttribute("id" , "clickable");
      const fold = folder.folderName;
      const folderId=folder.folderId;
      art.innerHTML = ` <div class="divfolder" >



      <i class='fa-solid folder fa-2x fa-folder-closed'> </i>
      
      
      <label class="dropdown"> 
      <div class=" dropdowndiv dd-button">
        <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
       
       </div>
      
       <input type="checkbox" class="dd-input" id="test">
      
       <ul class=" menulist dd-menu">
         <li class="menuu" ><button id="viewdetails"  type="button" onclick="viewDetail(${folderId})"><span class ="trigger"> View Details </span></button></li>
        
         <li class="divider"></li>
         
         <li class="menuu" > <button id="viewdetails" type="button" onclick="sendToTrash(${folderId})"><a href="#myModal" class="trigger-btn" data-toggle="modal">Delete the folder</a></button></li>
         <li class="divider"></li>
         <li class="menuu"><span clas="trigger"> Add to Favourites</span></li>
         
       </ul>
       
        
      </label> 
      
        
      <button onclick=openfile(${folderId}) class="folderName">${fold}</button>
     
      
    
  
      
      
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
  function onLoad() {
    listFolders();
    document.getElementById("admin").innerHTML=sessionStorage.getItem("name");
  }
  onLoad();
  function openfile(folderId) {
    sessionStorage.setItem("folderId",folderId);
    window.location.href="/Files/file.html";
  }
  // VIEWDETAILS
 function viewDetail(fold) {
  debugger;
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
debugger;
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
