const usernameEl = document.querySelector('#name-input');
const telEl = document.querySelector("#tel-input");
const idEl = document.querySelector("#id-input")
const pwdEl = document.querySelector("#pas-input")
const pwdEl1 = document.querySelector("#pas-input1")
const dupBtn = document.querySelector("#dup-btn")
const img1 = document.querySelector("#img1")

let db = window.indexedDB.open("login", 1)

db.onupgradeneeded = (e) => {
    console.log("upgradeneeded")
    db = e.target.result
    const store = db.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true
    })
    store.createIndex("pwd", "pwd", { unique: true })
    store.createIndex("username", "username", { unique: false })
    store.createIndex("grade", "grade", { uniquer: false })
}

db.onsuccess = (e) => {
    db = e.target.result
    img1.addEventListener("click", (e) => {
        const grade = document.querySelector(".button-on")
        const user = {
            id: idEl.value,
            pwd: pwdEl.value,
            username: usernameEl.value,
            tel: telEl.value,
            grade: grade.id
        }
        if (pwdEl.value === pwdEl1.value && idEl.dataset.num == "1") {
            const store = db.transaction("users", "readwrite").objectStore("users")
            const req = store.add(user)

            req.onsuccess = () => {
                console.log("저장성공")
            }

            req.onerror = () => {
                console.log(err)
            }
        } else {
            return false
        }

    })
}

dupBtn.addEventListener("click", () => {
    const store = db.transaction("users", "readonly").objectStore("users")
    const index = store.index("id")
    console.log(idEl.value)
    const req = index.getAll(idEl.value)

    req.onsuccess = (e) => {
        const result = e.target.result;
        console.log(result)
        if (result[0]?.id === idEl.value) {
            alert('이미 존재하는 아이디입니다.')
            idEl.focus();
            return false;
        }
        idEl.disabled = true;
        idEl.dataset.num = "1"
    }
})

