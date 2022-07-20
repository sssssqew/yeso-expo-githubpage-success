let btn = document.querySelectorAll(".ing_event_all_box_text_btn"); // HTML에있는 버튼 클랙스를 가져옴 
let btn2 = document.querySelectorAll(".modal_back");
let close = document.querySelectorAll(".close_btn");

// function modal() { // 모든 모달창을 히든시킴
//       for (var i = 0; i < btn.length; i++) {
//             console.log(i)
//             if (btn.length == btn[1]) {
//                   console.log(btn);
//                   btn[i].classList.add('hidden');
//             }
//       }
// }
// console.log(btn2)

function modal2(a) { // 
      btn2[a].classList.remove("hidden");
}
function close1(target) {
      btn2[target].classList.add("hidden")
}