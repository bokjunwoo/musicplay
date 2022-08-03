const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
//frame에 있는 article 8개를 불러온다
const len = list.length;
//article의 8개를 저장
const deg = 360 / len;
//length의 길이(8)을 나누어 저장

//앨범 사진
const names = ["cardio", "groove", "happy", "light", "lily", "limes", "pop", "swing"]

//45도 나누는 문법
for (let i = 0; i < len; i++) {
    list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

    //사진 배열 
    const pic = list[i].querySelector(".pic");
    pic.style.backgroundImage = `url(../img/${names[i]}.jpg)`;

    //노래 제목
    const title = list[i].querySelector(".text>h2");
    title.innerHTML = `${names[i]}`;

    //오디오 추가
    const audio = document.createElement("audio");
    audio.setAttribute("src", `../music/${names[i]}.mp3`); //속성
    audio.setAttribute("loop", "loop")

    list[i].append(audio); //오디오를 붙여라
}

//BTN
const prev = document.querySelector(".btn_prev");
const next = document.querySelector(".btn_next");
let num = 0;
let active = 0; 

prev.addEventListener("click", function(e) {
    frame.style.transform = `rotate(${deg * ++num}deg)`;

    //on class
    if(active === 0) {
        active = len - 1;
    } else {
        active--;
    }

    for(let el of list) {
        el.classList.remove("on");
    }
    list[active].classList.add("on");
}) 

next.addEventListener("click", function(e) {
    frame.style.transform = `rotate(${deg * --num}deg)`

    //on class
    if(active === len -1) { //마지막위치
        active = 0;
    } else {
        active++;
    }

    for(let el of list) {
        el.classList.remove("on");
    }
    list[active].classList.add("on");
})

//노래 페이지 넘어가면 멈추기
let before = -1;

//play 버튼
for(let el of list) {
    const play = el.querySelector(".play");
    const pause = el.querySelector(".pause");
    const load = el.querySelector(".reload");

    //play버튼에 on추가
    play.addEventListener("click", function(e){
        
        //노래 페이지 넘어가면 멈추기
        if(before === -1) {
            before = e.currentTarget;
        } else if(e.currentTarget !== before) {
            before.closest("article").querySelector("audio").pause();
            before.closest("article").querySelector(".pic").classList.remove("on")

            //before의 값 다시 가져오기
            before = e.currentTarget;
        } 

        e.currentTarget.closest("article").querySelector(".pic").classList.add("on")
        //closest => 상위 요소중에 가장 가까운요소

        //오디오 추가
        e.currentTarget.closest("article").querySelector("audio").play();
    })

    //play버튼에 on삭제
    pause.addEventListener("click", (e) => {
        e.currentTarget.closest("article").querySelector(".pic").classList.remove("on")

        //오디오 삭제
        e.currentTarget.closest("article").querySelector("audio").pause();
    })

    //load버튼
    load.addEventListener("click", (e) => {
        if(before === -1) {
            before = e.currentTarget;
        } else if(e.currentTarget !== before) {
            before.closest("article").querySelector("audio").pause();
            before.closest("article").querySelector(".pic").classList.remove("on")

            //before의 값 다시 가져오기
            before = e.currentTarget;
        }

        e.currentTarget.closest("article").querySelector(".pic").classList.add("on")

        //오디오 로드
        e.currentTarget.closest("article").querySelector("audio").load();
        //오디오 재실행
        e.currentTarget.closest("article").querySelector("audio").play();
    })
}

