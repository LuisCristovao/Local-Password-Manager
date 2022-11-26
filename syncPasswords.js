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
async function import_data(btn) {
  let prev_btn_state = btn.outerHTML;
  btn.innerHTML = "Loading...";
  let encrypted_db = await Communication("get");
  btn.outerHTML = prev_btn_state;
  //alert(encrypted_db)
  if (encrypted_db == "") {
    alert(
      "The Sync ID used returned empty data! please send again data from other source."
    );
  } else {
    if (!dbIsEmpty()) {
      if (confirm("You already have passwords stored want to append?")) {
        writeDB(encrypted_db, true);
        alert("Success appending data!");
        //erase data on server
        await Communication("send");
      } else {
        if (confirm("Want to overwrite?")) {
          writeDB(encrypted_db, false);
          alert("Success importing data!");
          //erase data on server
          await Communication("send");
        } else {
          alert("Import canceled, by user!");
        }
      }
    } else {
      writeDB(encrypted_db, false);
      alert("Success importing data!");
      //erase data on server
      await Communication("send");
    }
  }
  saveSyncId(getElement("sync_id").value);
}
async function send(btn) {
  if (dbIsEmpty()) {
    alert("You have nothing to send!");
  } else {
    let prev_btn_state = btn.outerHTML;
    btn.innerHTML = "Loading...";
    await Communication("send", exportDB());
    btn.outerHTML = prev_btn_state;
    alert("Send to server:\n" + exportDB());
  }
  //save sync id on localstore
  saveSyncId(getElement("sync_id").value);
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
function startPage() {
  let html = "";
  html+=`<h3>You host name is: ${host_name}</h3><br>`
  html += `<h3>Read QR Code to connect</h3><br>`;
  html += `<img><br>`;
  getElement("syncPasswordsDiv").innerHTML = html;
  
  //connection variable
  var conn = null;
  var connection_established = false;
  // first host to receive connection
  peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
    document
      .getElementsByTagName("img")[0]
      .setAttribute(
        "src",
        "https://api.qrserver.com/v1/create-qr-code/?data=http://192.168.1.88:5500/index.html?Connect::" +
          id +
          "&amp;size=100x100"
      );
  });
  //on connection
  peer.on("connection", function (_conn) {
    console.log("connected with " + _conn.peer);
    connection_established = true;
    // Send messages
    conn = _conn;

    setTimeout(() => {
      conn.send("Hello22");
    }, 200);

    conn.on("data", (data) => {
      console.log("Received3: ", data);
      /* if(data=="Hello!"){

      }else{

      } */
    });
  });

  if (window.location.search.split("::")[1] != undefined) {
    //wait to load page until try first connect
    setTimeout(() => {
      connect();
    }, 500);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function connect() {
  //host that initiates invitation for connection
  conn = peer.connect(window.location.search.split("::")[1]);

  conn.on("open", function () {
    // Receive messages
    conn.on("data", function (data) {
      console.log("Received0", data);
    });
    // Send messages
    conn.send("Hello!");
  });
}

function send(data) {
  conn.send(data);
}

//Main----------
//connection code ----
const host_name=RandomPassSync(5)
var peer = new Peer();
startPage();
checkScreenRatio();
