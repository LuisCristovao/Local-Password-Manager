let prev_screen_ratio = PageWithHeightRatio();
//function ----

async function Communication(get){
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
              body: exportDB()
          })
          return await response.text()  
      }catch(err){
          alert(`request fail with error ${err}`)
      }
      }
  
}
async function import_data(btn){
  let encrypted_db=await Communication("get")
  alert(encrypted_db)
  writeDB(encrypted_db,false)

}
async function send(btn){
  alert(await Communication("send"))
}
function ImportEncrypted(){
  //if db is not empty
      if(!dbIsEmpty()){
          if (confirm("Already have passwords stored wnat to append?")){
              /* writeDB(edb.value,append)         
              edb.value="Imported with success!"
              btn=success_btn(btn)
              btn.innerHTML="Success!"
              setTimeout(()=>{btn.outerHTML=prev_state},2000) */   
          }else{
              if(confirm("Want to overwrite local passwords?")){

              }else{
                alert("Canceled import!")
              }
              /* edb.value="Cancel by user!"
              btn=fail_btn(btn)
              btn.innerHTML="Cancel!"
              setTimeout(()=>{btn.outerHTML=prev_state},2000) */
          }
      }else{
         /*  writeDB(edb.value,append)
          edb.value="Imported with success!"
          btn=success_btn(btn)
          btn.innerHTML="Success!"
          setTimeout(()=>{btn.outerHTML=prev_state},2000) */
      }
  
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
function startPage() {
  let html = "";
  html+=`<button class="btn" style="font-size: ${(PageWithHeightRatio() >= changeRatio)?"3em":"3em"};left:0%;position: absolute;" onclick="goToInitialMenu()" >&lt;</button>`
  html += `<p style="${paragraphSize()};${
    PageWithHeightRatio() >= changeRatio ? "margin-top:10%" : "margin-top:20%"
  }">Sync ID:</p><input ${inputStyle()} type="text" id="sync_id"><br>`;
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
