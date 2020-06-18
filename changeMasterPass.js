let  prev_screen_ratio = PageWithHeightRatio()
function success_btn(btn){
    btn.style["font-size"]="1em"
    btn.style.color="lawngreen"
    btn.style["border-color"]="aqua"
    return btn
}
function fail_btn(btn){
    btn.style["font-size"]="1em"
    btn.style.color="red"
    btn.style["border-color"]="currentcolor"
    return btn
}
function changeMasterPassword(btn,old,new_pass,repeat){
    let previous_string=btn.outerHTML
    let old_pass=getElement(old)
    let new_password=getElement(new_pass)
    let repeat_pass=getElement(repeat)
    if(new_password.value!=repeat_pass.value){
        btn=fail_btn(btn)
        btn.innerHTML="Confirmation is differente than new password"
        setTimeout(()=>{btn.outerHTML=previous_string},2000)
    }else{
        let db=getDB(old_pass.value)
        if(db.length==0){
            btn=fail_btn(btn)
            btn.innerHTML="Empty or Wrong password"
            setTimeout(()=>{btn.outerHTML=previous_string},2000)
        }else{
            //store db with new pass
            EncryptDB(db,new_password.value)
            btn=success_btn(btn)
            btn.innerHTML="Changed Master Password with Success!!"
            setTimeout(()=>{btn.outerHTML=previous_string},2000)
        } 
    }
}

function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        startPage()

    }
    //setTimeout(checkScreenRatio,500)
}
function paragraphSize(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `font-size:1.2em;`
    }
    //height > width
    else {
        return `font-size:1.2em;`
    }
}
function showPassStyle(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `style="font-size:1em;"`
    }
    //height > width
    else {
        return `style="font-size:1em;"`
    }
}
function inputStyle(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `style="font-size:x-large;"`
    }
    //height > width
    else {
        return `style="font-size:x-large;"`
    }
}
function checkboxStyle(){
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `style="zoom:1;"`
    }
    //height > width
    else {
        return `style="zoom:1;"`
    }
}

function startPage(){

    let html=""
    html+=`<button class="btn" style="font-size: ${(PageWithHeightRatio() >= changeRatio)?"3em":"3em"};left:0%;position: absolute;" onclick="goToInitialMenu()" >&lt;</button>`
    html+=`<p style="${paragraphSize()};${(PageWithHeightRatio() >= changeRatio)?"margin-top:10%":"margin-top:20%"}">Old Password:</p><input ${inputStyle()} type="password" id="old_master_password"><p ${showPassStyle()}>show password:<input ${checkboxStyle()} type="checkbox" onclick="showPassword('old_master_password')"></p>`
    html+=`<div style="background:#cdcdcd;width:${(PageWithHeightRatio() >= changeRatio)?"60%":"95%"};height:1px"></div>`
    html+=`<p style="${paragraphSize()}">New Password:</p><input ${inputStyle()} type="password" id="new_master_password"><p ${showPassStyle()}>show password:<input ${checkboxStyle()} type="checkbox" onclick="showPassword('new_master_password')"></p>`
    html+=`<div style="background:#cdcdcd;width:${(PageWithHeightRatio() >= changeRatio)?"60%":"95%"};height:1px"></div>`
    html+=`<p style="${paragraphSize()}">Repeat Password:</p><input ${inputStyle()} type="password" id="repeat_master_password"><p ${showPassStyle()}>show password:<input ${checkboxStyle()} type="checkbox" onclick="showPassword('repeat_master_password')"></p>`
    html+=`<button style="font-size: ${(PageWithHeightRatio() >= changeRatio)?"1.5em":"1.5em"}" onclick="changeMasterPassword(this,'old_master_password','new_master_password','repeat_master_password')">change Master Password</button><br></br>`
    getElement("changeMasterPasswords").innerHTML=html

}
startPage()
checkScreenRatio()