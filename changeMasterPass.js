function changeMasterPassword(btn,old,new_pass,repeat){
    let previous_string=btn.outerHTML
    let old_pass=getElement(old)
    let new_password=getElement(new_pass)
    let repeat_pass=getElement(repeat)
    if(new_password.value!=repeat_pass.value){
        btn.innerHTML="Confirmation is differente than new password"
        setTimeout(()=>{btn.outerHTML=previous_string},2000)
    }else{
        let db=getDB(old_pass.value)
        if(db.length==0){
            btn.innerHTML="Empty or Wrong password"
            setTimeout(()=>{btn.outerHTML=previous_string},2000)
        }else{
            //store db with new pass
            EncryptDB(db,new_password.value)

            btn.innerHTML="Changed Master Password with Success!!"
            setTimeout(()=>{btn.outerHTML=previous_string},2000)
        } 
    }
}