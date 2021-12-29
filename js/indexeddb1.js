const eyeopenResult = document.querySelector("#eyeopen-result")
const focusResult = document.querySelector("#focus-result")
const gradeResult = document.querySelector("#result-result")
const start1 = document.querySelector(".start-btn")
const endBtn1 = document.querySelector(".end-btn")

let username = null

let data = new Date().toDateString()

const currentUser = location.search.slice(1).split('=')[1];

const init1 = () => {
    let db = indexedDB.open("login", 1)
    db.onsuccess = (e) => {
        db = e.target.result;
        const store = db.transaction("users", "readonly").objectStore("users")
        const index = store.index("id")
        const req = index.get(currentUser)
        req.onsuccess = (e) => {
            const result = e.target.result;
            username = result.username
        }
    }
}

init1()

start1.addEventListener("click", () => {
    if (faceDec.dataset.num === "1") {
        let db = window.indexedDB.open("result", 1)

        db.onupgradeneeded = (e) => {
            db = e.target.result
            const store = db.createObjectStore("users", {
                autoIncrement: true
            })
            store.createIndex("id", "id", { unique: false })
            store.createIndex("username", "username", { unique: false })
        }

        db.onsuccess = (e) => {
            db = e.target.result
            endBtn.addEventListener("click", (e) => {
                console.log(currentUser)
                const user = {
                    id: currentUser,
                    username: username,
                    eyesopen: eyeopenResult.innerHTML,
                    focus: focusResult.innerHTML,
                    grade: gradeResult.innerHTML,
                    data: data
                }

                const store = db.transaction("users", "readwrite").objectStore("users")
                const req = store.add(user)

                req.onsuccess = () => {
                    console.log("저장성공")
                }

                req.onerror = () => {
                    console.log("저장실패")
                }
            })
        }
    }else{
        console.log("인식되지 않음")
    }
})

