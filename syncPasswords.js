let prev_screen_ratio = PageWithHeightRatio();
//function ----

async function Communication(get="get",msg=""){
      let url="https://generic-server-py.herokuapp.com/"
      let sync_id=getElement("sync_id").value
      if(get=="get"){
            try{
  
                var response=await fetch(url+"getKey",{
                    method: 'POST',
                    "Content-Type":"text/html",
                    body: sync_id
                })
                return await response.text()  
            }catch(err){
                alert(`request fail with error ${err}`)
            }
        
      }else{
        try{
  
          var response=await fetch(url+"setKey/"+sync_id,{
              method: 'POST',
              "Content-Type":"text/html",
              body: msg
          })
          return await response.text()  
      }catch(err){
          alert(`request fail with error ${err}`)
      }
      }
  
}
async function import_data(btn){
  let encrypted_db=await Communication("get")
  //alert(encrypted_db)
  if(encrypted_db==""){
    alert("The Sync ID used returned empty data! please send again data from other source.")
  }else{

    if(!dbIsEmpty()){
      if (confirm("You already have passwords stored want to append?")){
        writeDB(encrypted_db,true)
        alert("Success appending data!")
        //erase data on server
        await Communication("send")
      }
      else{
        if(confirm("Want to overwrite?")){
          writeDB(encrypted_db,false)
          alert("Success importing data!")
          //erase data on server
          await Communication("send")
        }else{
          alert("Import canceled, by user!")
        }
      }
    }else{
          writeDB(encrypted_db,false)
          alert("Success importing data!")
          //erase data on server
          await Communication("send")
    }
  }
  saveSyncId(getElement("sync_id").value)
}
async function send(btn){
  if(dbIsEmpty()){
    alert("Yu have nothing to send!")
  }else{

    await Communication("send",exportDB())
    alert("Send to server:\n"+exportDB())
  }
  saveSyncId(getElement("sync_id").value)
}

function paragraphSize() {
  //width >= height
  if (PageWithHeightRatio() >= changeRatio) {
    return `font-size:2em;`;
  }
  //height > width
  else {
    return `font-size:2em;`;
  }
}
function inputStyle() {
  //width >= height
  if (PageWithHeightRatio() >= changeRatio) {
    return `style="font-size:x-large;"`;
  }
  //height > width
  else {
    return `style="font-size:x-large;"`;
  }
}
function checkScreenRatio() {
  if (prev_screen_ratio != PageWithHeightRatio()) {
    prev_screen_ratio = PageWithHeightRatio();
    startPage();
  }
  //setTimeout(checkScreenRatio, 500);
}
function calculateSyncID(){
  if (existsSyncId()){
    return getSyncId()
  }else{
    return RandomPass(5)
  }
}
function startPage() {
  let html = "";
  html+=`<button class="btn" style="font-size: ${(PageWithHeightRatio() >= changeRatio)?"3em":"3em"};left:0%;position: absolute;" onclick="goToInitialMenu()" >&lt;</button>`
  html += `<p style="${paragraphSize()};${
    PageWithHeightRatio() >= changeRatio ? "margin-top:10%" : "margin-top:20%"
  }">Sync ID:</p><input ${inputStyle()} type="text" id="sync_id" value=${calculateSyncID()}><br>`;
  html += `<button style="font-size: ${
    PageWithHeightRatio() >= changeRatio ? "1.5em" : "1.5em"
  };margin-top:${
    PageWithHeightRatio() >= changeRatio ? "5%" : "5%"
  }" onclick="send(this)">Send Encrypted Passwords</button><br>`;
  html += `<button style="font-size: ${
    PageWithHeightRatio() >= changeRatio ? "1.5em" : "1.5em"
  };margin-top:${
    PageWithHeightRatio() >= changeRatio ? "5%" : "5%"
  }" onclick="import_data(this)">Import Encrypted Passwords</button><br>`;
  getElement("syncPasswordsDiv").innerHTML = html;
}
//Main----------
startPage();
checkScreenRatio();
