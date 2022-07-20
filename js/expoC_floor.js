
/*장소버튼*/
var block1 = document.querySelector("#b1f")
var block2 = document.querySelector("#f1")
var img1 = document.querySelector("#img1")
var img2 = document.querySelector("#img2")

var btn1 = document.querySelector("#restroom")
var btn2 = document.querySelector("#ele")
var btn3 = document.querySelector("#restaurant")
var btn4 = document.querySelector("#store")
var btn5 = document.querySelector("#cash")
var btn6 = document.querySelector("#cafe")

var box1 = document.querySelector("#box1")
var box1_1 = document.querySelector("#box1_1")
var box2 = document.querySelector("#box2")


var restM = document.querySelector("#restroom_btn_m")
var restW = document.querySelector("#restroom_btn_w")
var f1_restM = document.querySelector("#f1_restroom_btn_m")
var f1_restW = document.querySelector("#f1_restroom_btn_w")

var f1_ele_btn = document.querySelector("#f1_ele_btn")

function resetIcon(){
box1.style.display= "none";
btn1.style.color= "#333333";
btn1.style.background= "white";
box2.style.display= "none";
btn2.style.color= "#333333";
btn2.style.background= "white";
box3.style.display= "none";
btn3.style.color= "#333333";
btn3.style.background= "white";
box4.style.display= "none";
btn4.style.color= "#333333";
btn4.style.background= "white";
box5.style.display= "none";
btn5.style.color= "#333333";
btn5.style.background= "white";
box6.style.display= "none";
btn6.style.color= "#333333";
btn6.style.background= "white";
}










function floorBtn01(){
      img1.style.display= "block"
      img2.style.display= "none"
      box1_1.style.display="none"
      box2.style.display="none"
      btn1.classList.remove("disabled")
      btn2.classList.add("disabled");
      btn3.classList.add("disabled");
      btn4.classList.add("disabled");
      btn5.classList.add("disabled");
      btn6.classList.add("disabled");
}

function floorBtn02(){
      img1.style.display= "none"
      img2.style.display= "block"
      btn1.classList.remove("disabled")
      btn2.classList.remove("disabled")
      btn3.classList.add("disabled")
      btn4.classList.add("disabled")
      btn5.classList.add("disabled")
      btn6.classList.add("disabled")
}

function floorFont01(){
      block1.style.color= "red"
      block2.style.color= "#FFFFFF"
}

function floorFont02(){
      block1.style.color= "#FFFFFF"
      block2.style.color= "red"
}

block1.addEventListener('click',function(){
      block1.classList.add("swichOn")
      block2.classList.remove("swichOn")
      floorBtn01();
      floorFont01();
      resetIcon();
})

block2.addEventListener('click',function(){
      block1.classList.remove("swichOn")
      block2.classList.add("swichOn")
      floorBtn02();
      floorFont02();
      resetIcon();
})



btn1.addEventListener("click",function(){
      if (btn1.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {

      // 지하1층 
      if (block1.classList.contains("swichOn")){
            restM.style.left="52.5%"
            restW.style.left="52.5%"
            restM.style.top=" 23%"
            restW.style.top="10%"
            box1_1.style.display= "none"
            box2.style.display= "none"
      }

       // 1층 
      if (block2.classList.contains("swichOn")){
            restM.style.left="49%"
            restW.style.left="49%"
            restM.style.top="20%"
            restW.style.top="8%"
            box1_1.style.display= "block"
      }
            resetIcon
            box1.style.display= "block"
            btn1.style.color= "white"
            btn1.style.background= "#E6301B"
            btn2.style.color= "#333333"
            btn2.style.background= "white"
            box2.style.display= "none"
      } 
})

btn2.addEventListener("click",function(){
      if (btn2.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {

      // 지하1층 
      if (block1.classList.contains("swichOn")){
            
            box2.style.display= "none"
            box1.style.display= "none"
            box1_1.style.display= "none"
      }

      // 1층 
      if (block2.classList.contains("swichOn")){
            box2.style.display= "block"
            box1.style.display= "none"
            box1_1.style.display= "none"

      }

            resetIcon
            btn1.style.color= "#333333"
            btn1.style.background= "white"
            box2.style.display= "block"
            btn2.style.color= "white"
            btn2.style.background= "#E6301B"
      }     
})

btn3.addEventListener("click",function(){
      if (btn3.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {
            resetIcon
            box3.style.display= "block"
            btn3.style.color= "white"
            btn3.style.background= "#E6301B"
      }     
})

btn4.addEventListener("click",function(){
      if (btn4.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {
            resetIcon
            box4.style.display= "block"
            btn4.style.color= "white"
            btn4.style.background= "#E6301B"
      }     
})

btn5.addEventListener("click",function(){
      if (btn5.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {
            resetIcon
            box5.style.display= "block"
            btn5.style.color= "white"
            btn5.style.background= "#E6301B"
      }     
})

btn6.addEventListener("click",function(){
      if (btn6.classList.contains("disabled")){
            Swal.fire('현 위치에 존재하지 않는 장소입니다.')
      } else {
            resetIcon
            box6.style.display= "block"
            btn6.style.color= "white"
            btn6.style.background= "#E6301B"
      }     
})


floorFont01(); 
floorBtn01();





