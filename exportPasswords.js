


function Export() {
    let export_password = getElement("export_password")
    let export_text_area = getElement("export_data")
    let data=dbToCsv(export_password.value)
    export_text_area.value=data
}
function ExportEncryptedData(){
    let export_text_area = getElement("export_data")
    export_text_area.value=exportDB()
}
function ExportEncryptedDB(){
    let html=""
    html+=`<button onclick="ExportEncryptedData()">Export</button><br>`
    html+=`<textarea id="export_data"></textarea>`
    getElement("exportPasswords").innerHTML=html
}
function ExportDecryptedCSV(){
    let html=""
    html+=`Password:<input type="password" id="export_password">show password:<input type="checkbox"><br>`
    html+=`<button onclick="Export()">Export</button><br>`
    html+=`<textarea id="export_data"></textarea>`
    getElement("exportPasswords").innerHTML=html
}