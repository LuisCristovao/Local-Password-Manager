
let  prev_screen_ratio = PageWithHeightRatio()
let export_btns_array=[
    {
        "name":"Export Encrypted",
        "function":"ExportEncryptedDB(this)"
    },
    {
        "name":"Export Decrypted CSV",
        "function":"ExportDecryptedCSV()"
    }
]
//functions----------
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
function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        var export_page = ""
        
        getElement("exportPasswords").innerHTML = home_page
    }
    setTimeout(checkScreenRatio,350)
}
function fail_btn(btn){
    //btn.style["font-size"]="1em"
    btn.style.color="red"
    btn.style["border-color"]="currentcolor"
    return btn
}
function Export(btn) {
    let export_password = getElement("export_password")
    let prev_state=btn.outerHTML
    if(export_password.value==""){
        btn=fail_btn(btn)
        btn.innerHTML="Empty Pass!"
        setTimeout(()=>{btn.outerHTML=prev_state},2000)
    }
    let export_text_area = getElement("export_data")
    let data=dbToCsv(export_password.value)
    if(data[1]==0){
        btn.style.color="lawngreen"
        btn.style["border-color"]="aqua"
        btn.innerHTML="Success!"
        setTimeout(()=>{btn.outerHTML=prev_state},2000)
        export_text_area.value=data[0]
    }else{
        if(data[1]==1){
            //wrong pass
            btn=fail_btn(btn)
            btn.innerHTML="Wrong Pass!"
            setTimeout(()=>{btn.outerHTML=prev_state},2000)
        }else{
            //no passwords stored
            btn=fail_btn(btn)
            btn.innerHTML="No Passwords Stored!"
            setTimeout(()=>{btn.outerHTML=prev_state},2000)
        }
    }
}

function ExportEncryptedDB(btn){
    let prev_state=btn.outerHTML
    copyToClipboard(exportDB())
    btn.innerHTML="Copied Encrypted DB!"
    btn.style.color="lawngreen"
    btn.style["border-color"]="aqua"
    setTimeout(()=>{btn.outerHTML=prev_state},2000)
}
function textareaSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `width:50%;height:200;margin-top:35px;font-size:1.5em`
    }
    //height > width
    else {
        return `width:80%;height:230;margin-top:35px;font-size:1em`
    }
}
function copyTextArea(btn){
    let prev_state=btn.outerHTML
    copyToClipboard(getElement("export_data").value)
    btn.innerHTML="Copied TextArea!"
    btn.style.color="lawngreen"
    btn.style["border-color"]="aqua"
    setTimeout(()=>{btn.outerHTML=prev_state},2000)
    

}
function ExportDecryptedCSV(){
    let html=""
    html+=`<div align="center" style="position:absolute;width:100%;heigh:100%">`
    html+=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;" onclick="window.location.reload()" >&lt;</button>`
    html+=`<p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"2em":"2em"};margin-top:${(PageWithHeightRatio() >= changeRatio)?"10px":"20px"}">Password:</p>`
    html+=`<input style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"}" type="password" id="export_password"><p style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.2em":"1.2em"}">show password:<input style="zoom:${(PageWithHeightRatio() >= changeRatio)?"1.5":"1.5"}" type="checkbox"  onclick="showPassword('export_password')"></p>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"}" onclick="Export(this)">Export</button><br>`
    html+=`<textarea id="export_data" style="${textareaSize()}"></textarea><br>`
    html+=`<button style="font-size:${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"};margin-top:35px" onclick="copyTextArea(this)">Copy Text</button>`
    html+=`</div>`

    getElement("exportPasswords").innerHTML=html
}
function startExportPage(){

    let html=""
    html+=`<button class="btn" style="font-size: ${backHomeBtnSize()};left:0%;position: absolute;" onclick="goToInitialMenu()" >&lt;</button>`
    let split_page_number=export_btns_array.length+1
    export_btns_array.forEach((btn_data,index)=>{

        html+=`<div align="center" style="position: absolute;top:${((index+1)/split_page_number)*100}%;width: 100%;height: auto;">`
        html+=`<button onclick="${btn_data.function}" style="font-size: ${menuButtonsFontSize()};">${btn_data.name}</button>`
        html+=`</div>`
    })
    getElement("exportPasswords").innerHTML=html

}
function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        startExportPage()

    }
    //setTimeout(checkScreenRatio,350)
}
startExportPage()
checkScreenRatio()