let prev_screen_ratio = PageWithHeightRatio();
//function ----
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
  setTimeout(checkScreenRatio, 500);
}
function startPage() {
  let html = "";

  html += `<p style="${paragraphSize()};${
    PageWithHeightRatio() >= changeRatio ? "margin-top:10%" : "margin-top:20%"
  }">Sync ID:</p><input ${inputStyle()} type="text" id="sync_id"><br>`;
  html += `<button style="font-size: ${
    PageWithHeightRatio() >= changeRatio ? "1.5em" : "1.5em"
  };margin-top:${
    PageWithHeightRatio() >= changeRatio ? "5%" : "5%"
  }" onclick="sync(this)">Sync Passwords</button><br></br>`;
  getElement("syncPasswordsDiv").innerHTML = html;
}
//Main----------
startPage();
checkScreenRatio();
