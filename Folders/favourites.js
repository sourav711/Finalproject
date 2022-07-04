function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
      var url='https://localhost:44366/api/Folder/favourite/'+sessionStorage.getItem("id");
    fetch(url, {
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
      console.log(folderId);
      art.innerHTML = `  <div class="divfolder" >
  
     
      <i class="fa-regular fa-star star " id="icon"  onclick="favorites()"></i>
  
     
  
      <i class='fa-solid  fa-2x fa-folder-closed foldericon'> </i>
      
      
      <label class="dropdown"> 
      <div class=" dropdowndiv dd-button">
        <i class="fa-solid fa-ellipsis-vertical dots"></i> 
       
       </div>
      
       <input type="checkbox" class="dd-input" id="test">
      
       <ul class=" menulist dd-menu">
         <li class="menuu" ><button id="viewdetails"  type="button" onclick=><span class ="trigger"> <button id="viewdetails" " type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">
  
         View details
         
          </button> </span></button></li>
        
         <li class="divider"></li>
         
         <li class="menuu" > <button id="viewdetails" type="button""><a style="text-decoration:none" href="#myModal" class="trigger-btn" data-toggle="modal">Delete the folder</a></button></li>
         <li class="divider"></li>
         <li class="menuu" ><span clas="trigger"  id="favorites"> Add to Favourites</span></li>
         
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
  function openfile(folderId) {
    sessionStorage.setItem("folderId",folderId);
    window.location.href="/Files/file.html";
  }
  
  function onLoad() {
    listFolders();
    document.getElementById("admin").innerHTML=sessionStorage.getItem("name");
  }
  onLoad();
  let logou = document.getElementById("logoutbtn");
  function logout() {
    window.location.href = "index.html";
    sessionStorage.clear();
  }
  