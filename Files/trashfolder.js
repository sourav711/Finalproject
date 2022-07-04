function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
    fetch('https://localhost:44366/api/Folder/Trash/'+sessionStorage.getItem("id"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      // console.log(folders);
      folders.forEach(folder => {
    
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
         <li class="menuu" ><button id="viewdetails"  type="button" onclick="removeFromTrash(${folderId})" >Remove From Trash</button></li>
        
         <li class="divider"></li>
         
         <li class="menuu" > <button id="viewdetails" type="button" onclick="permanentDelete(${folderId})" >Delete Permanently</button></li>
         
       </ul>
        
      </label> 
        
      <button class="folderName">${fold}</button>
     
      
      </div>
  
      
      
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

  function removeFromTrash(folderId){
    debugger;
var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch("https://localhost:44366/api/Folder/Undelete/"+folderId, requestOptions)
  .then(response => response.text())
  .then(result =>{
    console.log(result)
    listFolders()})
  .catch(error => console.log('error', error));
}

//deleting a folder
function permanentDelete(folder) {
  debugger;
  var raw = "";
var requestOptions = {

  method: 'DELETE',

  body: raw,

  redirect: 'follow'

};



let deleteurl = "https://localhost:44366/api/Folder/" + folder;




fetch(deleteurl,requestOptions)

.then(response=>response.text())

.then(result => console.log(result))

  .catch(error => console.log('error', error));

  location.reload();  



}