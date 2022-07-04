function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
    fetch('https://localhost:44392/api/Fileview/'+sessionStorage.getItem("folderId"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      console.log(folders);
      folders.forEach(folder => {
    
      var create = document.getElementById("create");
      var art = document.createElement("article");
      // console.log(folder);
      const fold = folder.documentName;
      // console.log(fold);
const docId=folder.documentId;
      // fold.style.backgroundColor = "red";
      // console.log(fold);
      art.innerHTML = `<i class=" filei fa-2x fa-solid fa-file"></i>
  
  

  

      
    
     
     
      <button style="font-size:  20px;text-decoration: none;position: relative;left: 400px;bottom: 2px;cursor: pointer;">${fold}</button>
      
      </i>`;
      create.appendChild(art);
      });
    })
    
    }
    catch(err)
    {
      console.log(err);
    }
  }

  listFolders();