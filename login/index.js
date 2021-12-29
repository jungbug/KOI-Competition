const backBtn = document.querySelector(".back-btn")
const id = document.querySelector(".id")
const pwd = document.querySelector(".pwd")
const loginBtn = document.querySelector(".login-btn")

loginBtn.addEventListener("click", () => {
    let db = indexedDB.open("login", 1)
    db.onsuccess = (e) => {
        db = e.target.result;
        const store = db.transaction("users", "readonly").objectStore("users")
        const index = store.index("id")
        const req = index.get(id.value)
        req.onsuccess = (e) => {
            const result = e.target.result;
            try {
                if(id.value === result.id && pwd.value === result.pwd && result.grade === "noraml"){
                    location.href = `../main/index.html?id=${result.id}`
                } else if(id.value === result.id && pwd.value === result.pwd && result.grade === "manager"){
                    location.href = "../manager/index.html"
                } else{
                    alert("아이디나 비번이 틀림")
                }
            } catch (error) {
                alert("아이디나 비번이 틀림")
            }
        }
    }
})

backBtn.addEventListener("click", () => {
    window.history.back()
})