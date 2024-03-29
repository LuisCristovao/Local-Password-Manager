//constants----
const body = getElement("body");
const pages = {
  "?Manage-Passwords": () => getHtml("managePasswords.html"),
  "?Import-Text-Passwords": () => getHtml("importPasswords.html"),
  "?Change-Master-Password": () => getHtml("changeMasterPass.html"),
  "?Export-Passwords": () => getHtml("exportPasswords.html"),
  "?Sync-Passwords": () => getHtml("syncPasswords.html"),
  "?Connect::": () => getHtml("syncPasswords.html"),
};
const changeRatio = 1;
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
//functions----
function showPassword(input_id) {
  let input = getElement(input_id);
  if (input.type == "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
function PageWithHeightRatio() {
  // 1 is equal size; >1 bigger width else the contrary
  return body.offsetWidth / body.offsetHeight;
}
async function getHtml(filename) {
  let response = await fetch(filename);
  let val = await response.text();
  var el = document.createElement("DIV");
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.position = "absolute";

  el.innerHTML = val;
  body.appendChild(el);
  Array.from(el.getElementsByTagName("script")).forEach((s) => {
    const scriptEl = document.createElement("script");
    scriptEl.src = s.src;
    document.body.appendChild(scriptEl);
  });
}
/* function checkScreenRatio(start_page_function) {
  if (prev_screen_ratio != PageWithHeightRatio()) {
    prev_screen_ratio = PageWithHeightRatio();
    start_page_function();
  }
  //setTimeout((start_page_function)=>{checkScreenRatio(start_page_function)}, 350);
} */

function getElement(id) {
  return document.getElementById(id);
}
function goToInitialMenu() {
  window.location.search = "";
}
function init() {
  let find_page=false
  const url = window.location.search;
  const defaultPage = () => getHtml("home.html");
  for(key in pages) {
    if(url.includes(key)){
      if(url.includes("?Connect::")){
        pages["?Connect::"]();
      }else{
        pages[url]();
      }
      find_page=true
    }
  }
  if(!find_page){
    defaultPage();
  } 
}
//main----

window.onload = init();
// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: './' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}