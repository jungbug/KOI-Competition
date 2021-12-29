const backBtn = document.querySelector(".back-btn")
const logOutBtn = document.querySelector(".log-out-btn")
const searchInp = document.querySelector("#search")
const searchBtn = document.querySelector("#search-btn")
const table = document.querySelector("#table")

searchBtn.addEventListener("click", () => {
    let db = indexedDB.open("result", 1)
    db.onsuccess = (e) => {
        db = e.target.result
        const store = db.transaction("users", "readonly").objectStore("users")
        const index = store.index("username")
        const req = index.getAll(searchInp.value)
        req.onsuccess = (e) => {
            const result = e.target.result
            for (let i = 0; i < result.length; i++) {
                const resouce = [result[i].username, result[i].id, result[i].eyesopen, result[i].focus, result[i].grade, result[i].data]
                const tr = document.createElement("tr")
                tr.classList.add("tr")
                for (let k = 0; k < 6; k++) {
                    const td = document.createElement("td")
                    td.innerHTML = resouce[k]
                    tr.appendChild(td)
                }
                table.appendChild(tr)
            }
        }

        req.onerror = () => {
            console.log("err")
        }
    }

    db.onerror = (e) => {
        console.log("err")
    }




})


backBtn.addEventListener("click", () => {
    window.history.back()
})

logOutBtn.addEventListener("click", () => {
    location.href = "../login/index.html"
})