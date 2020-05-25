
//import {csvToDB} from db.js
function ImportEncryptedDB(){
    let html=getElement("importPasswords").innerHTML
    html+=`<br>`
    html+=`<textarea></textarea><br>`
    html+=`<button onclick="ImportEncrypted()">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportDecryptedCSV(){
    let html=getElement("importPasswords").innerHTML
    html+=`<p>Insert text Passwords like |Site|UserName|Password|Description| in textarea.</p>`
    html+=`<p>Each line must be a new site password.</p><br>`
    html+=`Password use to encrypt:<input id="password_import" type="password"><input type="checkbox" onclick="showPassword('password_import')">show password<br><br>`
    html+=`Data splitting character:<input id="spliting character" type="text" value=","><br>`
    html+=`<textarea id="data"></textarea>`
    html+=`<button onclick="Import()">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportFromOld(){
    let html=getElement("importPasswords").innerHTML
    html+=`<p>Insert text Passwords like |id|site|user|password| in textarea.</p>`
    html+=`<p>Each line must be a new site password.</p><br>`
    html+=`<p><b>Only use this option if you used application on...</b></p><br>`
    html+=`Password use to encrypt:<input id="password_import" type="password"><input type="checkbox" onclick="showPassword('password_import')">show password<br><br>`
    html+=`<textarea id="data"></textarea>`
    html+=`<button onclick="oldImport()">Old Import</button>`
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
function ImportEncrypted(){
    let edb=document.getElementsByTagName("textarea")[0]
    writeDB(edb.value)
    edb.value="Imported wit success!"
}