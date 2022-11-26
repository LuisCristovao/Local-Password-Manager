let columns = ["site", "user", "pass", "description"];
let firms_to_trick_attackers = [
  "Apple",
  "Microsoft",
  "Samsung Electronics",
  "Alphabet",
  "Google",
  "AT&amp;T",
  "Amazon",
  "Verizon Communications",
  "China Mobile",
  "Walt Disney",
  "Facebook",
  "Alibaba",
  "Intel",
  "Softbank",
  "IBM",
  "Tencent Holdings",
  "Nippon Telegraph &amp; Tel",
  "Cisco Systems",
  "Oracle",
  "Deutsche Telekom",
  "Taiwan Semiconductor",
];

function dbIsEmpty() {
  if (localStorage["PM"] == null || localStorage["PM"].trim() == "") {
    return true;
  } else {
    return false;
  }
}
function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function RandomPass(size) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,()/%&$#@=[]{} ";

  for (var i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
function RandomPassSync(size) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function writeDB(data, append) {
  if (append) {
    localStorage["PM"] += "\n";
    localStorage["PM"] += data;
  } else {
    localStorage["PM"] = data;
  }
}
function getDB(pass_value) {
  pass_value = pass_value.toString();
  db = localStorage["PM"];
  if (db == null) {
    return [];
  } else {
    decrypt_db = [];
    try {
      db.split("\n").forEach((row) => {
        if (row == "") {
        } else {
          let decrypt_line = {};
          let row_json = JSON.parse(decrypt(row, pass_value));
          for (key in row_json) {
            decrypt_line[key] = decrypt(row_json[key], pass_value);
          }
          decrypt_db.push(decrypt_line);
        }
      });
      return decrypt_db;
    } catch {
      return [];
    }
  }
}
function updateDB(data, row_number_id, pass_value) {
  let db = getDB(pass_value);
  db[row_number_id] = data;
  EncryptDB(db, pass_value);
}
function deleteDB(row_number_id, pass_value) {
  let db = getDB(pass_value);
  delete db[row_number_id];
  EncryptDB(db, pass_value);
}

function EncryptDB(db, pass_value) {
  let db_string = "";
  let new_db = db.map((db_line) => {
    for (key in db_line) {
      db_line[key] = encrypt(db_line[key], pass_value);
    }
    return encrypt(JSON.stringify(db_line), pass_value);
  });
  localStorage["PM"] = new_db.reduce((acc, n) => acc + "\n" + n);
}
function csvToDB(data, pass_value, split_data_character,append) {
  let db = [];
  if(append){
    if(split_data_character!="\\t"){
      data+=dbToCsv(pass_value)[0].replaceAll("\t",split_data_character)
    }else{
      data+=dbToCsv(pass_value)[0]
    }
  }
  let db_line = {};
  data.split("\n").forEach((row, id) => {
    if (row == "") {
    } else {
      let columns_data =
        split_data_character == "\\t"
          ? row.split("\t")
          : row.split(split_data_character);
      columns_data.forEach((data, index) => {
        db_line[columns[index]] = encrypt(data, pass_value);
      });
      db.push(encrypt(JSON.stringify(db_line), pass_value));
    }
  });
  if (db.length == 0) {
    return false;
  }
  localStorage["PM"] = db.reduce((acc, n) => acc + "\n" + n);
  return true;
}
function emptyDbLine() {
  line = {};
  columns.forEach((col) => {
    line[col] = "";
  });
  return line;
}

function dbToCsv(pass_value) {
  let data = localStorage["PM"];
  let line = "";
  let db = "";
  let error_code = 0;
  let rows = data.split("\n");
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let d = decrypt(row, pass_value);
    if (row == "") {
    } else {
      try {
        let d_json = JSON.parse(d);
      } catch {
        if (d != "") {
          return [db, 1];
        } else {
          return [db, 1];
        }
      }
      line = "";
      let d_json = JSON.parse(d);
      columns.forEach((col, index) => {
        if (index < columns.length - 1) {
          line += decrypt(d_json[columns[index]], pass_value) + "\t";
        } else {
          line += decrypt(d_json[columns[index]], pass_value);
        }
      });
      line += "\n";
      db += line;
    }
  }
  return [db, 0];
}
function exportDB() {
  return localStorage["PM"];
}
// sync id ---
function existsSyncId(){
  if (localStorage["PMSYNC"]==null || localStorage["PMSYNC"]==""){
    return false
  }
  return true
}

function saveSyncId(hash){
  localStorage["PMSYNC"]=hash
}
function getSyncId(){
  if(existsSyncId()){
    return localStorage["PMSYNC"]
  }
  return ""
}