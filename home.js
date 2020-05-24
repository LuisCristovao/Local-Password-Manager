const home_body = getElement("home_body")
var prev_screen_ratio = PageWithHeightRatio()
var time=0
const changeRatio=1
function createUL() {
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `<ul style="padding:10%;">`
    }
    //height > width
    else {
        return `<ul style="padding:25%;">`
    }
}
function goToUrl(url){
    window.location.search=url
}
function createLi(text) {
    console.log(PageWithHeightRatio())
    //width >= height
    if (PageWithHeightRatio() >= changeRatio) {
        return `<li style="padding-top:3%;font-size:3em;cursor:pointer" onclick="goToUrl('?${text.replace(/ /g, '-')}')">${text}</li>`
    }
    //height > width
    else {
        return `<li style="padding-top:15%;font-size:5em;cursor:pointer" onclick="goToUrl('?${text.replace(/ /g, '-')}')">${text}</li>`
    }
}

function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        prev_screen_ratio=PageWithHeightRatio()
        var home_page = ""
        home_page += createUL()
        const menu = ["Manage Passwords", "Change Master Password", "Import Text Passwords", "Export Passwords"]
        menu.forEach(el => {
            home_page += createLi(el)
        })
        home_body.innerHTML = home_page
    }
    setTimeout(checkScreenRatio,350)
}

function start_home() {

    var home_page = ""
    home_page += createUL()
    const menu = ["Manage Passwords", "Change Master Password", "Import Text Passwords", "Export Passwords"]
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
    var font_size=parseFloat(li.style["font-size"])
    const font_size_max_increase = 0.005

    font_size = font_size + (font_size_max_increase*2) * sin(time)
    //console.log(font_size)
    li.style["font-size"] = `${font_size}em`
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
checkScreenRatio()
liAnimation()