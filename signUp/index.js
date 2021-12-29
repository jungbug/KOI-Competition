const mon = document.querySelector("#mon")
const date = document.querySelector("#date")
const buttons = document.querySelectorAll("button")
const backBtn = document.querySelector(".back-btn")
const pwd = document.querySelector("#pas-input")
const pwd1 = document.querySelector("#pas-input1")
const endBtn = document.querySelector("#img1")
const id = document.querySelector("#id-input")

let flag = null

let init = () => {
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option")
        option.innerHTML = `${i}월`
        mon.appendChild(option)
    }
    for (let k = 1; k <= 31; k++) {
        const option = document.createElement("option")
        option.innerHTML = `${k}일`
        date.appendChild(option)
    }
}

buttons[1].addEventListener("click", () => {
    flag = true
    if (flag) {
        buttons[1].classList.add("button-on")
        buttons[2].classList.remove("button-on")
    } else if (!flag) {
        buttons[2].classList.add("button-on")
        buttons[1].classList.remove("button-on")
    }
})

buttons[2].addEventListener("click", () => {
    flag = false
    if (flag) {
        buttons[1].classList.add("button-on")
        buttons[2].classList.remove("button-on")
    } else if (!flag) {
        buttons[2].classList.add("button-on")
        buttons[1].classList.remove("button-on")
    }
})

endBtn.addEventListener("click", () => {
    if(pwd.value === pwd1.value && id.dataset.num == "1"){
        location.href = "../login/index.html"
    }else if(pwd.value === pwd1.value && !id.dataset.num == "1"){
        alert("중복확인을 해주세요")
    }else{
        alert("비밀번호가 틀렸습니다")
    }
})

let maxLengthCheck = (object) => {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

backBtn.addEventListener("click", () => {
    window.history.back()
})


init()