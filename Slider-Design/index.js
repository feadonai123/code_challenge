var 
    pauseCarrosel = false,
    pauseCarroselInterval = false,
    firstClick = true,
    carroselInterval

window.onload=()=>{
    const 
        undoBtn = document.getElementById("undo_btn"),
        nextBtn = document.getElementById("next_btn")

    undoBtn.addEventListener("click", ()=>handleBtnRoll("undo"))
    nextBtn.addEventListener("click", ()=>handleBtnRoll("next"))

    setInterval(() => {
        !pauseCarroselInterval && rollCarrosel("next")
    }, 2000);
}

function handleBtnRoll(type) {

    pauseCarroselInterval = true
    clearInterval(carroselInterval)
    carroselInterval = setTimeout(()=>{
        pauseCarroselInterval = false
    }, 2000)
   
    rollCarrosel(type)

    pauseCarrosel = true
    firstClick && setTimeout(()=>{
        pauseCarrosel = false
        firstClick = true
    }, 600)
    firstClick = false
}

function rollCarrosel(type){

    if(pauseCarrosel) return

    const 
        row = document.querySelector(".row"),
        listItems = Array.from(row.children),
        action = {
            undo: ()=>{
                row.removeChild(listItems[listItems.length-1])
                row.insertBefore(listItems[listItems.length-1], listItems[0])
            },
            next: ()=>{
                row.removeChild(listItems[0])
                row.appendChild(listItems[0])
            },
        }

    action[type] && action[type]()
}