
let  prev_screen_ratio = PageWithHeightRatio()
let import_btns_array=[
    {
        "name":"Import Encrypted DB",
        "function":"ImportEncryptedDB()"
    },
    {
        "name":"Import Decrypted CSV",
        "function":"ImportDecryptedCSV()"
    },
    {
        "name":"Import from old PM",
        "function":"ImportFromOld()"
    }
]
function menuButtonsFontSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `2em`
    }
    //height > width
    else {
        return `2em`
    }
}
function backHomeBtnSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `3em`
    }
    //height > width
    else {
        return `3em`
    }
}
function textareaSize(){
     //width >= height
     if (PageWithHeightRatio() >= changeRatio) {
        return `width:50%;height:30%;margin-bottom:10px;font-size:1.3em`
    }
    //height > width
    else {
        return `width:80%;height:60%;margin-bottom:10px;font-size:1.3em`
    }
}
function paragraphSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `font-size:2em;margin-bottom:30px;margin-top:50px`
    }
    //height > width
    else {
        return `font-size:2em;margin-bottom:30px;margin-top:20%`
    }
}

//import {csvToDB} from db.js
function ImportEncryptedDB(){
    //let html=getElement("importPasswords").innerHTML
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    html+=`<p style="${paragraphSize()}">Insert Encrypted DB below:</p>`
    html+=`<textarea style="${textareaSize()}"></textarea><br>`
    html+=`<button style="font-size:${menuButtonsFontSize()}" onclick="ImportEncrypted(this,false)">Import</button>`
    html+=`<button style="font-size:${menuButtonsFontSize()}" onclick="ImportEncrypted(this,true)">Append</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportDecryptedCSV(){
    //let html=getElement("importPasswords").innerHTML
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.9em;margin-bottom:10px":"font-size:1.5em;margin-top:20%"}">Password used to encrypt:</p><input style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"}" id="password_import" type="password"><p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"1.2em"}">show password:<input type="checkbox" style="zoom:${(PageWithHeightRatio() >= changeRatio)?"1.5":"1.5"}" onclick="showPassword('password_import')"></p>`
    html+=`<p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"1.2em"}" >Data splitting character:<input id="spliting character" type="text" value="," style="width:30;font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1em"}"></p><br>`
    html+=`<textarea id="data" style="${(PageWithHeightRatio() >= changeRatio)?"width:500;height:200;margin-bottom:20px;font-size:1.2em":"width:80%;height:40%;margin-bottom:20px;font-size:1.2em"}">`
    html+=`facebook,user1,12345,facebook password example\n`
    html+=`google,user2,1223,google password example description\n`
    html+=`</textarea><br>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"2em"}" onclick="Import(this,false)">Import</button>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"2em"}" onclick="Import(this,true)">Append</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportFromOld(){
    //let html=getElement("importPasswords").innerHTML
    
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.5em;margin-bottom:10px":"font-size:1em;margin-top:20%"}"><b>Only use this option if you used previous <a href="https://github.com/LuisCristovao/Local_Password_Manager_Server">application</a></b></p>`
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.5em;":"font-size:1.5em;margin-top:10px"}">Password used to encrypt:</p><input style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"}" id="password_import" type="password"><p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"1.2em"}">show password:<input type="checkbox" style="zoom:${(PageWithHeightRatio() >= changeRatio)?"1.5":"1.5"}" onclick="showPassword('password_import')"></p>`
    //html+=`<p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"1.2em"}" >Data splitting character:<input id="spliting character" type="text" value="," style="width:30;font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1em"}"></p>`
    html+=`<textarea id="data" style="${(PageWithHeightRatio() >= changeRatio)?"width:500;height:200;margin-bottom:10px;font-size:1.2em":"width:80%;height:40%;margin-bottom:10px;font-size:1.2em"}">`
    html+=`1\tfacebook\tuser1\t12345\n`
    html+=`2\tgoole\tuser2\t1223\n`
    html+=`</textarea><br>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"1.5em"}" onclick="oldImport(this,false)">Old Import</button>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"1.5em"}" onclick="oldImport(this,true)">Append</button>`
    // html+=`<p>Insert text Passwords like |id|site|user|password| in textarea.</p>`
    // html+=`<p>Each line must be a new site password.</p><br>`
    // html+=`<p><b>Only use this option if you used application on...</b></p><br>`
    // html+=`Password use to encrypt:<input id="password_import" type="password"><input type="checkbox" onclick="showPassword('password_import')">show password<br><br>`
    // html+=`<textarea id="data"></textarea>`
    // html+=`<button onclick="oldImport()">Old Import</button>`
    getElement("importPasswords").innerHTML=html
}
function oldImport(btn,append){
    let password_import = getElement("password_import")
    let prev_state=btn.outerHTML
    if(password_import.value==""){
        btn=fail_btn(btn)
        btn.innerHTML="Empty Pass!"
        setTimeout(()=>{btn.outerHTML=prev_state},2000)
    }else{

        let data = getElement("data")
        let filtered_data=""
        data.value.split("\n").forEach(row => {
            if(row==""){
    
            }else{
    
                let cols=row.split("\t")
                filtered_data+=`${cols[1]}\t${cols[2]}\t${cols[3]}\tdescription...\n`
            }
        });
        if(filtered_data==""){
            btn=fail_btn(btn)
            btn.innerHTML="Import Error"
            setTimeout(()=>{btn.outerHTML=prev_state},2000)
            data.value = "Something got wrong try to export again from previous app."
        }else{
            if(dbIsEmpty() || append==true){

                if(!csvToDB(filtered_data,password_import.value,"\t",append)){
                    data.value = "Error reading data, check if the information inserted is similar to the initial example."
                    btn=fail_btn(btn)
                    btn.innerHTML="Import Error"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                }else{
                    btn=success_btn(btn)
                    btn.innerHTML="Success!"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                    data.value = "Imported passwords and encrypted them!"
                }
            }else{
                if (confirm("This will overwrite previouse data. Are you sure you want to continue?")){
                    if(!csvToDB(filtered_data,password_import.value,"\t",append)){
                        data.value = "Error reading data, check if the information inserted is similar to the initial example."
                        btn=fail_btn(btn)
                        btn.innerHTML="Import Error"
                        setTimeout(()=>{btn.outerHTML=prev_state},2000)
                    }else{
                        btn=success_btn(btn)
                        btn.innerHTML="Success!"
                        setTimeout(()=>{btn.outerHTML=prev_state},2000)
                        data.value = "Imported passwords and encrypted them!"
                    }
                }else{
                    data.value = "Cancel by user."
                    btn=fail_btn(btn)
                    btn.innerHTML="Cancel"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                }
            }



            // btn=success_btn(btn)
            // btn.innerHTML="Success!"
            // setTimeout(()=>{btn.outerHTML=prev_state},2000)

            // csvToDB(filtered_data,password_import.value,"\t")
            // data.value = "Imported passwords and encrypted them!"
        }
    }
}
function success_btn(btn){
    //btn.style["font-size"]="1em"
    btn.style.color="lawngreen"
    btn.style["border-color"]="aqua"
    return btn
}
function fail_btn(btn){
    //btn.style["font-size"]="1em"
    btn.style.color="red"
    btn.style["border-color"]="currentcolor"
    return btn
}
function Import(btn,append) {
    let prev_state=btn.outerHTML
    let password_import = getElement("password_import")
    if(password_import.value==""){
        btn=fail_btn(btn)
        btn.innerHTML="Empty Pass!"
        setTimeout(()=>{btn.outerHTML=prev_state},2000)
    }else{

        let data = getElement("data")
        let split_data_character = getElement("spliting character")
        if(split_data_character.value==""){
            btn=fail_btn(btn)
            btn.innerHTML="Import Error"
            setTimeout(()=>{btn.outerHTML=prev_state},2000)
            data.value="Empty split character"
        }else{
            if(dbIsEmpty() || append==true){

                if(!csvToDB(data.value,password_import.value,split_data_character.value,append)){
                    data.value = "Error reading data, check if the information inserted is similar to the initial example."
                    btn=fail_btn(btn)
                    btn.innerHTML="Import Error"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                }else{
                    btn=success_btn(btn)
                    btn.innerHTML="Success!"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                    data.value = "Imported passwords and encrypted them!"
                }
            }else{
                if (confirm("This will overwrite previouse data. Are you sure you want to continue?")){
                    if(!csvToDB(data.value,password_import.value,split_data_character.value,append)){
                        data.value = "Error reading data, check if the information inserted is similar to the initial example."
                        btn=fail_btn(btn)
                        btn.innerHTML="Import Error"
                        setTimeout(()=>{btn.outerHTML=prev_state},2000)
                    }else{
                        btn=success_btn(btn)
                        btn.innerHTML="Success!"
                        setTimeout(()=>{btn.outerHTML=prev_state},2000)
                        data.value = "Imported passwords and encrypted them!"
                    }
                }else{
                    data.value = "Cancel by user."
                    btn=fail_btn(btn)
                    btn.innerHTML="Cancel"
                    setTimeout(()=>{btn.outerHTML=prev_state},2000)
                }
            }
        }
    }
}
function ImportEncrypted(btn,append){
    let prev_state=btn.outerHTML

    let edb=document.getElementsByTagName("textarea")[0]
    //if import overwrite
    if(!append){
        if(!dbIsEmpty()){
            if (confirm("This will overwrite previouse data. Are you sure you want to continue?")){
                writeDB(edb.value,append)         
                edb.value="Imported with success!"
                btn=success_btn(btn)
                btn.innerHTML="Success!"
                setTimeout(()=>{btn.outerHTML=prev_state},2000)   
            }else{
                edb.value="Cancel by user!"
                btn=fail_btn(btn)
                btn.innerHTML="Cancel!"
                setTimeout(()=>{btn.outerHTML=prev_state},2000)
            }
        }else{
            writeDB(edb.value,append)
            edb.value="Imported with success!"
            btn=success_btn(btn)
            btn.innerHTML="Success!"
            setTimeout(()=>{btn.outerHTML=prev_state},2000)
        }
    }else{
        writeDB(edb.value,append)
        edb.value="Imported with success!"
        btn=success_btn(btn)
        btn.innerHTML="Success!"
        setTimeout(()=>{btn.outerHTML=prev_state},2000)
    }
}
function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        startPage()

    }
    //setTimeout(checkScreenRatio,500)
}

function startPage(){

    let html=""
    html+=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;" onclick="goToInitialMenu()" >&lt;</button>`
    let split_page_number=import_btns_array.length+1
    import_btns_array.forEach((btn_data,index)=>{

        html+=`<div align="center" style="position: absolute;top:${((index+1)/split_page_number)*100}%;width: 100%;height: auto;">`
        html+=`<button onclick="${btn_data.function}" style="font-size: ${menuButtonsFontSize()};">${btn_data.name}</button>`
        html+=`</div>`
    })
    getElement("importPasswords").innerHTML=html

}
startPage()
checkScreenRatio()