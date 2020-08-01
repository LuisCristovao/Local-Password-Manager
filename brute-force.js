//let charset = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
let charset = "abc";
let input=document.getElementById("pass")
let pass_list=document.getElementById("passwords_list")
let number_of_chars=0
let stack=[]
let pass=""
let i=0
function genBrutePass(index,charset,nc){
    let length=charset.length
    let pass=""
    let actual_index=index%length
    let combination_size=1
    //let num_of_characters=Math.floor(index/length)+1
    for(let j=0;j<nc;j++){
        combination_size=combination_size*length
    }



}
while(true){
    pass=charset[i]
    input.value=pass
    getList()
    if(pass_list.innerHTML!=`<p style="font-size:1.4em;">No Passwords Stored or Wrong Password</p>`){
        break;
    }
    if(i=(i+1)%charset.length==0){
        number_of_chars++;
    }
    i++;
    if(i==11){
        break
    }
}


/* var done = false;
var maxLength = 3;
//var letterDB = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split("");
var letterDB = "123456789abc".split("");
let input=document.getElementById("pass")
let pass_list=document.getElementById("passwords_list")
let number_of_chars=1
let pass=""
let i=0


function test(str){
    letterDB.forEach(letter=>{

    })
}

function recursion (str,i) {
      
      var test = str+letterDB[i];
        pass=test
        console.log(pass)
        input.value=pass
        getList()
        
      if (pass_list.innerHTML==`<p style="font-size:1.4em;">No Passwords Stored or Wrong Password</p>` && !done  && str.length < maxLength ) {
         setTimeout(() => {
             i++
            recursion(pass,i);
         }, 500); 
      } else if (pass_list.innerHTML!=`<p style="font-size:1.4em;">No Passwords Stored or Wrong Password</p>`) {
         done = true;
         
      }
   
}
recursion("",i); */