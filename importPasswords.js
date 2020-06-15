
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
        return `3em`
    }
    //height > width
    else {
        return `5em`
    }
}
function backHomeBtnSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `3em`
    }
    //height > width
    else {
        return `7em`
    }
}
function textareaSize(){
     //width >= height
     if (PageWithHeightRatio() >= changeRatio) {
        return `width:500;height:250;margin-bottom:10px`
    }
    //height > width
    else {
        return `width:600;height:800;margin-bottom:50px`
    }
}
function paragraphSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `font-size:2em;margin-bottom:30px;margin-top:50px`
    }
    //height > width
    else {
        return `font-size:4em;margin-bottom:40px;margin-top:30%`
    }
}

//import {csvToDB} from db.js
function ImportEncryptedDB(){
    //let html=getElement("importPasswords").innerHTML
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    html+=`<p style="${paragraphSize()}">Insert Encrypted DB below:</p>`
    html+=`<textarea style="${textareaSize()}"></textarea><br>`
    html+=`<button style="font-size:${menuButtonsFontSize()}" onclick="ImportEncrypted(this)">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportDecryptedCSV(){
    //let html=getElement("importPasswords").innerHTML
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.9em;margin-bottom:10px":"font-size:4em;margin-top:30%"}">Password used to encrypt:</p><input style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"4em"}" id="password_import" type="password"><p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"3em"}">show password:<input type="checkbox" style="zoom:${(PageWithHeightRatio() >= changeRatio)?"1.5":"2.5"}" onclick="showPassword('password_import')"></p>`
    html+=`<p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"3em"}" >Data splitting character:<input id="spliting character" type="text" value="," style="width:30;font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1em"}"></p><br>`
    html+=`<textarea id="data" style="${(PageWithHeightRatio() >= changeRatio)?"width:500;height:200;margin-bottom:20px;font-size:1.2em":"width:700;height:500;margin-bottom:20px;font-size:2.3em"}">`
    html+=`facebook,user1,12345,facebook password example\n`
    html+=`google,user2,1223,google password example description\n`
    html+=`</textarea><br>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"4em"}" onclick="Import()">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportFromOld(){
    //let html=getElement("importPasswords").innerHTML
    
    let html=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;margin:1%" onclick="window.location.reload()" >&lt;</button>`
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.5em;margin-bottom:10px":"font-size:4em;margin-top:20%"}"><b>Only use this option if you used previous <a href="https://github.com/LuisCristovao/Local_Password_Manager_Server">application</a></b></p>`
    html+=`<p style="${(PageWithHeightRatio() >= changeRatio)?"font-size:1.5em;":"font-size:4em"}">Password used to encrypt:</p><input style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"4em"}" id="password_import" type="password"><p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"3em"}">show password:<input type="checkbox" style="zoom:${(PageWithHeightRatio() >= changeRatio)?"1.5":"2.5"}" onclick="showPassword('password_import')"></p>`
    html+=`<p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"3em"}" >Data splitting character:<input id="spliting character" type="text" value="," style="width:30;font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1em"}"></p>`
    html+=`<textarea id="data" style="${(PageWithHeightRatio() >= changeRatio)?"width:500;height:200;margin-bottom:10px;font-size:1.2em":"width:700;height:500;margin-bottom:30px;font-size:2.3em"}">`
    html+=`facebook,user1,12345\n`
    html+=`goole,user2,1223\n`
    html+=`</textarea><br>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"4em"}" onclick="oldImport()">Old Import</button>`
    // html+=`<p>Insert text Passwords like |id|site|user|password| in textarea.</p>`
    // html+=`<p>Each line must be a new site password.</p><br>`
    // html+=`<p><b>Only use this option if you used application on...</b></p><br>`
    // html+=`Password use to encrypt:<input id="password_import" type="password"><input type="checkbox" onclick="showPassword('password_import')">show password<br><br>`
    // html+=`<textarea id="data"></textarea>`
    // html+=`<button onclick="oldImport()">Old Import</button>`
    getElement("importPasswords").innerHTML=html
}
function oldImport(){
    let password_import = getElement("password_import")
    let data = getElement("data")
    let filtered_data=""
    data.value.split("\n").forEach(row => {
        if(row==""){

        }else{

            let cols=row.split("\t")
            filtered_data+=`${cols[1]}\t${cols[2]}\t${cols[3]}\tdescription...\n`
        }
    });
    csvToDB(filtered_data,password_import.value,"\t")
    data.value = "Imported passwords and encrypted them!"
}
function Import() {

    let password_import = getElement("password_import")
let data = getElement("data")
let split_data_character = getElement("spliting character")
    csvToDB(data.value,password_import.value,split_data_character.value)
    data.value = "Imported passwords and encrypted them!"
}
function ImportEncrypted(btn){
    let prev_state=btn.outerHTML
    let edb=document.getElementsByTagName("textarea")[0]
    writeDB(edb.value)
    edb.value="Imported with success!"
}
function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        startPage()

    }
    setTimeout(checkScreenRatio,500)
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