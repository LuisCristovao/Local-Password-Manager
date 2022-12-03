let prev_screen_ratio = PageWithHeightRatio();
//function ----

async function Communication(get = "get", msg = "") {
  let url = "https://generic-server-py.herokuapp.com/";
  let sync_id = getElement("sync_id").value;
  if (get == "get") {
    try {
      var response = await fetch(url + "getKey", {
        method: "POST",
        "Content-Type": "text/html",
        body: sync_id,
      });
      return await response.text();
    } catch (err) {
      alert(`request fail with error ${err}`);
      return "";
    }
  } else {
    try {
      var response = await fetch(url + "setKey/" + sync_id, {
        method: "POST",
        "Content-Type": "text/html",
        body: msg,
      });
      return await response.text();
    } catch (err) {
      alert(`request fail with error ${err}`);
      return "";
    }
  }
}
function import_data(append) {
  let encrypted_db = document.getElementsByTagName("textarea")[0].value
  if (append) {
    writeDB(encrypted_db, true);
    alert("Success appending data!");
    window.location.href = window.location.origin + "/Local-Password-Manager/"
  } else {
    writeDB(encrypted_db, false);
    alert("Success importing data!");
    window.location.href = window.location.origin + "/Local-Password-Manager/"
  }
}

function sendPasswordsEncrypted() {
  if (dbIsEmpty()) {
    alert("You have nothing to send!");
  } else {
    conn.send(exportDB())
  }

}

function paragraphSize() {
  //width >= height
  if (PageWithHeightRatio() >= changeRatio) {
    return `font-size:2em;`;
  }
  //height > width
  else {
    return `font-size:2em;`;
  }
}
function inputStyle() {
  //width >= height
  if (PageWithHeightRatio() >= changeRatio) {
    return `style="font-size:x-large;"`;
  }
  //height > width
  else {
    return `style="font-size:x-large;"`;
  }
}
function checkScreenRatio() {
  if (prev_screen_ratio != PageWithHeightRatio()) {
    prev_screen_ratio = PageWithHeightRatio();
    startPage();
  }
  //setTimeout(checkScreenRatio, 500);
}
function calculateSyncID() {
  if (existsSyncId()) {
    return getSyncId();
  } else {
    return RandomPassSync(5);
  }
}
function shareConnectionUrl(btn) {
  if (peer_id != null) {
    copyToClipboard(window.location.origin + "/Local-Password-Manager/?Connect::" +
      peer_id)
    let old_text = btn.innerText
    btn.innerText = "Copied Link!"
    setTimeout(() => {
      btn.innerText = old_text
    }, 1000)
  }

}
function trying_to_connect() {
  if (!receive_info) {
    conn.send(`Hello!${host_name}`);
    setTimeout(trying_to_connect, 500)
  }
}
function startPage() {
  let html = "";
  html += `<h3>You host name is: ${host_name}</h3><br>`;
  html += `<button class="btn" style="font-size:3em;position:absolute;top:0px;left:0px;;left:0%;position: absolute;" onclick="goToInitialMenu()">&lt;</button>`;
  html += `<h3>Read QR Code to connect</h3><br>`;
  html += `<img><br>`;
  html += `<button style="font-size:large" onclick="shareConnectionUrl(this)">Share Connection Url</button>`;
  getElement("syncPasswordsDiv").innerHTML = html;

  var connection_established = false;
  // first host to receive connection
  peer.on("open", function (id) {
    peer_id = id
    console.log("My peer ID is: " + id);
    document
      .getElementsByTagName("img")[0]
      .setAttribute(
        "src",
        "https://api.qrserver.com/v1/create-qr-code/?data=" + window.location.origin + "/Local-Password-Manager/?Connect::" +
        id +
        "&amp;size=100x100"
      );
  });

  //on connection
  peer.on("connection", (_conn) => {
    console.log("connected with " + _conn.peer);
    connection_established = true;
    // Send messages
    conn = _conn;
    
    setTimeout(() => { 
      conn.send(`Hello!${host_name}`); 
    }, 300)


    conn.on("data", (data) => {
      console.log("Received3: ", data);
      receive_info = true
      if (data.slice(0, 6).includes("Hello!")) {
        createConnectionEstablishedPage(data.slice(6));
      } else {
        receiveDataPage(data)
      }
    });

    //setTimeout(trying_to_connect, 500)

  });

  if (window.location.search.split("::")[1] != undefined) {
    //wait to load page until try first connect
    connect();
  }
}
function createConnectionEstablishedPage(_other_host_name) {
  other_host_name = _other_host_name;
  let html = `<h3>You host name is: ${host_name}</h3><br>`;
  html += `<button style="font-size:large" onclick='sendPasswordsEncrypted()'>Send Data to ${other_host_name}</button>`;
  html += `<button class="btn" style="font-size:3em;position:absolute;top:0px;left:0px;;left:0%;position: absolute;" onclick="goToInitialMenu()">&lt;</button>`;
  getElement("syncPasswordsDiv").innerHTML = html;
}
function receiveDataPage(data) {
  let html = `<h3>Receiving data from host : ${other_host_name}</h3><br>`;
  html += `<button class="btn" style="font-size:3em;position:absolute;top:0px;left:0px;;left:0%;position: absolute;" onclick="goToInitialMenu()">&lt;</button>`;
  html += `<textarea style="width:250px;height:300px">${data}</textarea><br>`;
  html += `<button style="font-size:large" onclick='import_data(append=false)'>OverWrite Data</button>`;
  if (!dbIsEmpty()) {
    html += `<button style="font-size:large" onclick='import_data(append=true)'>Append Data</button>`;
  }
  // html += `<button style="font-size:large" onclick='alert("Sending data")'>Cancel</button>`;
  getElement("syncPasswordsDiv").innerHTML = html;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function connect() {
  //host that initiates invitation for connection
  conn = peer.connect(window.location.search.split("::")[1]);

  conn.on("open", () => {
    // Receive messages
    conn.on("data", function (data) {
      console.log("Received0", data);
      receive_info = true
      send(`Hello!${host_name}`)
      if (data.slice(0, 6).includes("Hello!")) {
        createConnectionEstablishedPage(data.slice(6));
      } else {
        receiveDataPage(data)
      }
    });
    // Send messages
    //conn.send(`Hello!${host_name}`);
  });

  // setTimeout(() => {
  //   if (!receive_info) {
  //     connect()
  //   }
  // }, 1500)
}

function send(data) {
  conn.send(data);
}

//Main----------
//connection code ----
var peer_id = null
var receive_info = false
const host_name = RandomPassSync(5);
var other_host_name = null;
var peer = new Peer();
var conn = null
startPage();
checkScreenRatio();
