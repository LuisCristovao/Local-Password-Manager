let columns = ["site", "user", "pass", "description"]
let firms_to_trick_attackers=["Apple","Microsoft","Samsung Electronics","Alphabet","Google","AT&amp;T","Amazon","Verizon Communications","China Mobile","Walt Disney","Facebook","Alibaba","Intel","Softbank","IBM","Tencent Holdings","Nippon Telegraph &amp; Tel","Cisco Systems","Oracle","Deutsche Telekom","Taiwan Semiconductor"]


function getRandomValueFromArray(array){
    return array[Math.floor(Math.random() * array.length)]
}

function RandomPass(size) {
    
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,()/%&$#@=[]{} ";

    for (var i = 0; i < size; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

function writeDB(data){
    localStorage["PM"]=data
}
function getDB(pass_value){
    pass_value=pass_value.toString()
    db = localStorage["PM"]
    if(db==null){
        return []
    }
    else{
        decrypt_db=[]
        try{
            db.split("\n").forEach(row=>{
                if(row==""){
                    
                }else{

                    let decrypt_line={}
                    let row_json = JSON.parse(decrypt(row, pass_value))
                    for(key in row_json){
                        decrypt_line[key]=decrypt(row_json[key],pass_value)
                    }
                    decrypt_db.push(decrypt_line)
                }
            })
            return decrypt_db
        }catch{
            db.split("\n").forEach(row=>{
                if(row==""){
                    
                }else{
                    let decrypt_line={}
                    let decrypted_row = decrypt(row, pass_value)
                    let row_window_length=Math.floor(decrypted_row.length/columns.length)
                    for(i in columns){
                        i=parseInt(i)
                        if (columns[i]=="site"){
                            decrypt_line[columns[i]]=getRandomValueFromArray(firms_to_trick_attackers)
                        }else{

                            decrypt_line[columns[i]]=RandomPass(Math.floor(Math.random() * 200))
                        }
                    }
                    decrypt_db.push(decrypt_line)
                }
            })
            return decrypt_db
        }
        
    }

}
function updateDB(data,row_number_id,pass_value){
    let db=getDB(pass_value)
    db[row_number_id]=data
    EncryptDB(db,pass_value)
}
function deleteDB(row_number_id,pass_value){
    let db=getDB(pass_value)
    delete db[row_number_id]
    EncryptDB(db,pass_value)
}

function EncryptDB(db,pass_value){
    let db_string=""
    let new_db=db.map(db_line=>{
        
        for(key in db_line){
            db_line[key]=encrypt(db_line[key],pass_value)
        }
        return encrypt(JSON.stringify(db_line),pass_value)
    })
    localStorage["PM"]=new_db.reduce((acc, n) => acc + '\n' + n)

}
function csvToDB(data,pass_value,split_data_character){
    let db = []
    let db_line = {}
    data.split('\n').forEach((row,id) => {
        if(row==""){

        }else{
            let columns_data = (split_data_character == '\\t')?row.split('\t'):row.split(split_data_character)
            columns_data.forEach((data, index) => {
                db_line[columns[index]] = encrypt(data, pass_value)
            })
            db.push(encrypt(JSON.stringify(db_line), pass_value))
        }
    })
    localStorage["PM"] = db.reduce((acc, n) => acc + '\n' + n)
}
function emptyDbLine(){
    line={}
    columns.forEach(col=>{
        
        line[col]=""
    })
    return line
}

function dbToCsv(pass_value){
    let data = localStorage["PM"]
    let line = ""
    let db = ""
    data.split("\n").forEach(row => {
        let d = decrypt(row, pass_value)
        if(row==""){

        }else{

            let d_json = JSON.parse(d)
            line = ""
            columns.forEach((col, index) => {
                if (index < columns.length-1) {
    
                    line += decrypt(d_json[columns[index]], pass_value) + '\t'
                } else {
                    line += decrypt(d_json[columns[index]], pass_value)
                }
            })
            line += '\n'
            db += line
        }
    })
    return db
}
function exportDB(){
    return localStorage["PM"]
}