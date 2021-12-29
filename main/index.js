const URL = "https://teachablemachine.withgoogle.com/models/BidPy0cIW/";
const backBtn = document.querySelector(".back-btn")
const faceDec = document.querySelector("#face-dec")
const rightCanvas = document.querySelector("#right-canvas")
const leftCanvas = document.querySelector("#left-canvas")
const startBtn = document.querySelector(".start-btn")
const chartContainers = document.querySelectorAll(".chart-container")
const iframePractice = document.querySelector("#iframe-practice")
const mainIframe = document.querySelector(".iframe")
const chartPer = document.querySelectorAll("#chart-per")
const resetBtn = document.querySelector("#reset-btn")
const logOutBtn = document.querySelectorAll(".log-out-btn")
const endBtn = document.querySelector(".end-btn")
const main1 = document.querySelector("#main1")
const main2 = document.querySelector("#main2")
const canvasDiv = document.querySelector(".canvas-div")
let model, labelContainer, maxPredictions;
let classFocusAve = null
let eyesOpenAve = null
let eyesCloseAve = null
let uptime = 0
let uptime1 = 0
let eyeOpen = 0
let eyeClose = 0
let classFocus = 0
let flag = false
let opentime = 0
let closetime = 0
const eyes = ["eye open", "eye close"]

const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    window.requestAnimationFrame(loop);
    labelContainer = document.querySelector("#label")
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("span"));
    }
}

const loop = async () => {
    await predict();
    window.requestAnimationFrame(loop);
}

const predict = async () => {
    const prediction = await model.predict(leftCanvas);
    for (let i = 0; i < maxPredictions; i++) {
        let classPrediction = eyes[i] + " : " + Math.floor(prediction[i].probability * 100) + "%" + "&nbsp;"
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    if (faceDec.dataset.num === "1" && flag) {
        classFocus++
        uptime1++
        if(opentime > 800){
            eyeClose = eyeClose + prediction[0].probability
        }else if(closetime < 30){
            eyeOpen = eyeOpen + prediction[0].probability
        }
        // }else if(closetime > 30){
        //     eyeClose = eyeClose + prediction[1].probability
        // }
        if (closetime > 30) {
            eyeClose = eyeClose + prediction[1].probability
        }
    }

    if(faceDec.dataset.num === "0"){
        rightCanvas.classList.remove("green-border")
        leftCanvas.classList.remove("green-border")
        rightCanvas.classList.remove("red-border")
        leftCanvas.classList.remove("red-border")
        rightCanvas.classList.add("white-border")
        leftCanvas.classList.add("white-border")
    } else if(prediction[0].probability > 0.8){
        rightCanvas.classList.add("green-border")
        leftCanvas.classList.add("green-border")
        rightCanvas.classList.remove("red-border")
        leftCanvas.classList.remove("red-border")
        rightCanvas.classList.remove("white-border")
        leftCanvas.classList.remove("white-border")
    } else if(prediction[0].probability < 0.8){
        rightCanvas.classList.add("red-border")
        leftCanvas.classList.add("red-border")
        rightCanvas.classList.remove("green-border")
        leftCanvas.classList.remove("green-border")
        rightCanvas.classList.remove("white-border")
        leftCanvas.classList.remove("white-border")
    }

    if (flag) {
        opentime++
        closetime++
        uptime++
    }
    if (prediction[0].probability > 0.8) {
        closetime = 0
    }else{
        opentime = 0
    }
    
    classFocusAve = Math.floor(classFocus / uptime * 100)
    eyesOpenAve = 100 - Math.floor(eyeClose / uptime1 * 100)
    eyesCloseAve = Math.floor(eyeClose / uptime1 * 100)
}

startBtn.addEventListener("click", () => {
    if(faceDec.dataset.num === "1"){
        flag = true
        main1.classList.add("display")
        iframePractice.remove()
        main2.classList.remove("display")
    }else{
        alert("눈동자가 인식되지 않습니다. 마스크벗기 또는 턱을 괴지마세요")
        console.log(flag)
    }
})

endBtn.addEventListener("click", () => {
    flag = false
    main2.classList.add("display")
    mainIframe.remove()
    main3.classList.remove("display")
    const eyeopenResult = document.querySelector("#eyeopen-result")
    const focusResult = document.querySelector("#focus-result")
    const result = document.querySelector("#result-result")
    const ctx = document.querySelector("#chart")
    const chartDis = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["eye open", "eye close"],
            datasets: [{
                label: '# of Votes',
                data: [eyesOpenAve, eyesCloseAve],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
        }

    })

    const ctx1 = document.querySelector("#chart1")
    const chartFoc = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ["집중", "이탈"],
            datasets: [{
                label: '# of Votes',
                data: [classFocusAve, 100 - classFocusAve],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
        }
    });

    // if (95 < eyesOpenAve) {
    //     chartPer[0].innerHTML = "아주 좋음"
    // } else if (90 < eyesOpenAve) {
    //     chartPer[0].innerHTML = "좋음"
    // } else if (80 < eyesOpenAve) {
    //     chartPer[0].innerHTML = "보통"
    // } else if (70 < eyesOpenAve) {
    //     chartPer[0].innerHTML = "나쁨"
    // } else if (eyesOpenAve <= 70) {
    //     chartPer[0].innerHTML = "아주 나쁨"
    // }

    // if (95 < classFocusAve) {
    //     chartPer[1].innerHTML = "아주 좋음"
    // } else if (90 < classFocusAve) {
    //     chartPer[1].innerHTML = "좋음"
    // } else if (80 < classFocusAve) {
    //     chartPer[1].innerHTML = "보통"
    // } else if (70 < classFocusAve) {
    //     chartPer[1].innerHTML = "나쁨"
    // } else if (classFocusAve <= 70) {
    //     chartPer[1].innerHTML = "아주 나쁨"
    // }

    eyeopenResult.innerHTML = `${eyesOpenAve}%`
    focusResult.innerHTML = `${classFocusAve}%`

    let resAverage = (eyesOpenAve + classFocusAve) / 2

    if (95 < resAverage) {
        result.innerHTML = "아주 좋음"
    } else if (90 < resAverage) {
        result.innerHTML = "좋음"
    } else if (80 < resAverage) {
        result.innerHTML = "보통"
    } else if (70 < resAverage) {
        result.innerHTML = "나쁨"
    } else if (resAverage <= 70) {
        result.innerHTML = "아주 나쁨"
    }
})

backBtn.addEventListener("click", () => {
    window.history.back()
})

resetBtn.addEventListener("click", () => {
    location.href = "../login/index.html"
})

for(let i = 0; i < 2; i++){
    logOutBtn[i].addEventListener("click" , () => {
        location.href = "../login/index.html"
    })
}

init()

