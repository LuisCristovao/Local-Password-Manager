const home_body = getElement("home_body")
var prev_screen_ratio = PageWithHeightRatio()
var time=0


function Highlight(el){
    el.style["text-decoration"]="underline"
}
function NotHighLight(el){
    el.style["text-decoration"]=""
}

function createUL() {
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `<ul style="padding:5%;">`
    }
    //height > width
    else {
        return `<ul style="padding:15%;">`
    }
}
function goToUrl(url){
    window.location.search=url
}
function createLi(text) {
    console.log(PageWithHeightRatio())
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `<li onmouseover="Highlight(this)" onmouseout="NotHighLight(this)" style="padding-top:3%;font-size:3em;cursor:pointer" onclick="goToUrl('?${text.replace(/ /g, '-')}')">${text}</li>`
    }
    //height > width
    else {
        return `<li onmouseover="Highlight(this)" onmouseout="NotHighLight(this)" style="padding-top:15%;font-size:2em;cursor:pointer" onclick="goToUrl('?${text.replace(/ /g, '-')}')">${text}</li>`
    }
}

 function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        start_home()
    }
    setTimeout(checkScreenRatio,350)
} 

function start_home() {

    var home_page = ""
    home_page += createUL()
    let menu=[]
    if(dbIsEmpty()){
        menu = ["Manage Passwords","Import Text Passwords","Sync Passwords"]
    }else{
        menu = ["Manage Passwords","Import Text Passwords", "Export Passwords","Sync Passwords","Change Master Password"]
    }
    menu.forEach(el => {
        home_page += createLi(el)
    })
    home_body.innerHTML = home_page
}

function sin(x){
    return Math.sin(x)
}
function liAnimation(){
    time+=0.1
    const list_elements=Array.from(document.getElementsByTagName('li'))
    var li=list_elements[0]
    if(li.style.color!=''){
        var color=parseInt(li.style.color.split("rgb(")[1].split(",")[0])
    }else{
        var color=255
    }
    const font_size_max_increase = 0.005

     color = 60*sin(0.5*time)+230
    //console.log(font_size)
    li.style["color"] = `rgb(${color},${color},${color})`
//    list_elements.forEach(li=>{
//        var font_size=parseFloat(li.style["font-size"])
//        const font_size_max_increase=0.01
//        
//        font_size=font_size+font_size_max_increase*sin(time)
//        console.log(font_size)
//        li.style["font-size"]=`${font_size}em`
//    })
    requestAnimationFrame(liAnimation)
}
//Main--------
start_home()
checkScreenRatio(start_home)
liAnimation()
//prevent return button exploit
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};