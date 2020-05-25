


function Export() {
    let export_password = getElement("export_password")
    let export_text_area = getElement("export_data")
    let data=dbToCsv(export_password.value)
    export_text_area.value=data
}

function ExportEncryptedDB(btn){
    let prev_state=btn.outerHTML
    copyToClipboard(exportDB())
    btn.innerHTML="Copy Encrypted DataBase to ClipBoard"
    setTimeout(()=>{btn.outerHTML=prev_state},2000)
}
function ExportDecryptedCSV(){
    let html=""
    html+=`Password:<input type="password" id="export_password">show password:<input type="checkbox" onclick="showPassword('export_password')"><br>`
    html+=`<button onclick="Export()">Export</button><br>`
    html+=`<textarea id="export_data"></textarea>`
    getElement("exportPasswords").innerHTML=html
}