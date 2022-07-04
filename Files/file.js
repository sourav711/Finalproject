const constants = {
  apiBasePath: "https://localhost:44366/api/",
};
var id = sessionStorage.getItem("id");
console.log(id);
var adminname = sessionStorage.getItem("name");
console.log(adminname);
var folderid = sessionStorage.getItem("folderId");
var curr = new Date();
var date = curr.toISOString();

// var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":"
// + curr.getMinutes() + ":" + curr.getSeconds();
const form = document.getElementById("folderr");
console.log(form);

function createFolder() {
  try {
    fetch("https://localhost:44366/api/Document", {
      body: JSON.stringify({
        // "folderName": form.value,
        // "createdBy": id,
        // "isDeleted": 0,
        documentName: form.value,
        createdAt: curr.toISOString(),
        isDeleted: 0,
        contentType: "c#",
        size: 120,
        createdBy: id,
        folderId: sessionStorage.getItem("folderId"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}
function listFolders() {
  try {
    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(
      "https://localhost:44366/api/Document/" +
        sessionStorage.getItem("folderId"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("create");
          var art = document.createElement("article");
          console.log(folder);
          const fold = folder.documentName;
          console.log(fold);
          // fold.style.backgroundColor = "red";
          // console.log(fold);
          art.innerHTML = ` <i class="fa-solid fa-download"></i>  
     
          <button type = "button" >${fold}</button>
          
          
      
     `;
          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
// function openfile() {

//   window.location.href="cg.html";
// }

function onLoad() {
  listFolders();
  document.getElementById("admin").innerHTML = adminname;
}

onLoad();

// let logou = document.getElementById("logoutbtn");

function logout() {
  window.location.href = "index.html";
  sessionStorage.clear();

}
function searchItem() {
  var val = document.getElementById("search1");
  console.log(val.value);

  var url =
    "https://localhost:44366/api/Document/" +
    val.value +
    "," +
    folderid +
    "," +
    id;

  fetch(url)
    .then((res) => res.json())
    .then((folders) => {
      // console.log(folders);
      folders.forEach((folder) => {
        var create = document.getElementById("create");
        create.innerHTML = "";

        var create = document.getElementById("create");
        var art = document.createElement("article");
        const fold = folder.documentName;

        // fold.style.backgroundColor = "red";
        // console.log(fold);
        art.innerHTML = `  <label class="dropdown">
  
          <div class="dd-button">
          <i class=" dots fa-solid fa-ellipsis-vertical"></i>
          </div>
        
          <input type="checkbox" class="dd-input" id="test">
        
          <ul class="dd-menu">
            <li class=" view" >view details</li>
           
            <li class="divider"></li>
             <li class="view">
            Delete the folder
            </li> 
          </ul>
          
        </label>
          
        
      <button onclick=openfile() style="font-size:   40px; color: black; text-decoration: none;position: relative;left: 20px;bottom: 20px;cursor: pointer;">${fold}</button>
      
      </i>`;
        create.appendChild(art);
      });
    });
}

// choose file function

const choose = document.getElementById("real-file");
console.log(choose);

function choosefiles() {
  debugger;

  try {
    fetch("https://localhost:44392/api/Document", {
      body: JSON.stringify({
        // "folderName": form.value,
        // "createdBy": id,
        // "isDeleted": 0,
        documentName: value,
        createdAt: curr.toISOString(),
        isDeleted: 0,
        contentType: "c#",
        size: 120,
        createdBy: id,
        folderId: sessionStorage.getItem("folderId"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}

function listFolders() {
  try {
    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(
      "https://localhost:44366/api/Document/" +
        sessionStorage.getItem("folderId"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("create");
          var art = document.createElement("article");
          // console.log(folder);
          const fold = folder.documentName;
          // console.log(fold);
          const docId = folder.documentId;
          // fold.style.backgroundColor = "red";
          // console.log(fold);
          art.innerHTML = `
          <div class= "file">
          <img src ="https://img.freepik.com/free-vector/open-folder-folder-with-documents-document-protection-concept_183665-104.jpg?w=826" class="folderimg" height=100px>
          
          <button  onclick="viewFile(${docId})" class="documentName">${fold}</button>
          </div>
         `;

          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

// function deletefile(fileid) {

//   var raw = "";

// var requestOptions = {
//   method: 'DELETE',
//   body: raw,
//   redirect: 'follow'
// };

// let deleteurl = "https://localhost:44366/api/Document/" + fileid;

// fetch(deleteurl,requestOptions)
// .then(response=>response.text())
// .then(result => console.log(result))
//   .catch(error => console.log('error', error));
//   location.reload();

// }
function viewDetail(fold) {
  
  console.log(fold);
  fetch("https://localhost:44392/api/Fileview/" + fold)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      alert(
        "Document Id:" +
          result.documentId +
          "\nDocument Name:" +
          result.documentName +
          "\nContent Type:" +
          result.contentType +
          "\nSize:" +
          result.size +
          "\nCreated By:" +
          result.createdBy +
          "\nCreated At:" +
          result.createdAt +
          "\nFolder Id:" +
          result.folderId
      );
    });
}

// upload a file from local storage

function uploadFiles() {
  let value = choose.files[0];
  var formdata = new FormData();
  formdata.append("files", value);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://localhost:44366/api/Document/upload/"+date+"/"+id+"/"+folderid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      listFolders();
    })
    .catch((error) => console.log("error", error));
}

function viewFile(docId) {
  debugger;
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  let url = "https://localhost:44366/api/Document/download/" + docId;

  fetch(url, requestOptions)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      //  a.download =docId;
      a.click();
    });
}

function downloadFile(docId) {
  debugger;
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  let url = "https://localhost:44366/api/Document/download/" + docId;

  fetch(url, requestOptions)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = docId;
      a.click();
    });
}

function sendToTrash(docId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch("https://localhost:44366/api/Document/" + docId, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      listFolders();
    })
    .catch((error) => console.log("error", error));
}
