const showForm = document.getElementById("showForm")
const form = document.getElementById("taskForm")
const taskText = document.getElementById("taskText")
const addTask = document.getElementById("addTask")
const container = document.getElementById("container")
const close = document.getElementById("close")
const filter = document.getElementById("filter")
const hidden = document.getElementById("hidden")
const select = document.getElementById("select")
const deleteTask = document.getElementById("delete")
const udpate = document.getElementById("update")
const taskUpdate = document.getElementById("taskUpdate")

const date = new Date()
const month = date.toLocaleString('default', {month: 'long'})
const day = date.getDate();
const year = date.getFullYear();

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let selectedTaskId = null;

showForm.addEventListener("click", () => {
    form.style.display = "block"
})

form.addEventListener("submit", event => {
    event.preventDefault()

    const task = {
        id: Date.now(),
        taskName: taskText.value,
        status: "pending",
        createdAt: `${month} ${day}, ${year}`
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTasks()
    taskText.value = "";
    form.style.display = "none"
})

function displayTasks(){
    container.innerHTML = ""
    
    for(let i = 0; i < tasks.length; i++){
        const task = tasks[i]

        if (filter.value !== "all" && task.status !== filter.value){
            continue;
        } 
        const card = document.createElement("div");
        card.classList.add("card")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = "taskCheckbox"
        checkbox.classList.add("hidden")

        const taskName = document.createElement("p")
        taskName.textContent = task.taskName
        taskName.classList.add("p")
        
        const statusText = document.createElement("p")
        switch(task.status){
            case("pending"):
                statusText.classList.add("pending");
                break;
            case("active"):
                statusText.classList.add("active");
                break;
            case("completed"):
                statusText.classList.add("completed");
                break;
        }
        
        statusText.id = "status"
        statusText.textContent = task.status

        statusText.addEventListener("click",() => {
            if(task.status === "pending")task.status = "active";
            else if(task.status === "active") task.status = "completed";
            else if(task.status === "completed") task.status = "pending";

            localStorage.setItem('tasks', JSON.stringify(tasks))
            displayTasks();
        })

        const createdAtText = document.createElement("p")
        createdAtText.textContent = task.createdAt
        
        card.dataset.id = task.id
        card.appendChild(checkbox)
        card.appendChild(taskName)
        card.appendChild(statusText)
        card.appendChild(createdAtText)

        container.appendChild(card)
    }
}

filter.addEventListener("change", () => {
    displayTasks()
})

function selectTask(){
    for(let i =0 ; i<tasks.length; i++){
        tasksCheckbox[i].classList.contains("hidden") ? 
            tasksCheckbox[i].classList.replace("hidden", "show") : 
                tasksCheckbox[i].classList.replace("show", "hidden")
    }

    if(hidden.classList.contains("show")) return hidden.classList.replace("show", "hidden")
    hidden.classList.replace("hidden", "show")
}
select.addEventListener("click", selectTask)

close.addEventListener("click", () => form.style.display = "none")
displayTasks()
const tasksCheckbox = document.querySelectorAll("#taskCheckbox")

tasksCheckbox.forEach(check => check.addEventListener("change", () => {
    const checkedTask = check.parentElement;
    const checkedCheckbox = document.querySelectorAll("#taskCheckbox:checked").length;
    console.log(checkedTask)
    console.log(checkedTask.dataset.id)

    if(check.checked){
        selectedTaskId = Number(check.parentElement.dataset.id)
    } else selectedTaskId = null
    console.log(selectedTaskId)

    deleteTask.addEventListener("click", () => {
        const index = tasks.findIndex(task => task.id === Number(checkedTask.dataset.id))
        
        if(index !== -1){
            tasks.splice(index, 1)
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
        displayTasks()
    })
    console.log(checkedCheckbox)

    if(checkedCheckbox > 1){
        udpate.classList.add("hidden")
    } else {
        udpate.classList.remove("hidden")
    }

    udpate.addEventListener("click", event => {
        const card = document.querySelector(`[data-id="${selectedTaskId}"]`)
        const p = card.querySelector(".p")

        const input = document.createElement("input")
        input.value = p.textContent
        
        p.replaceWith(input)
        input.focus()

        input.addEventListener("blur", save);
        input.addEventListener("keydown", event => {
            if(event.key === "Enter") save()
        })

        function save(){
            const newTaskName = input.value.trim();
            if(!newTaskName) return

            const task = tasks.find(task => task.id === selectedTaskId)
            task.taskName = newTaskName

            localStorage.setItem('tasks', JSON.stringify(tasks))
            displayTasks();
            selectTask()
            hideAction();
            selectedTaskId = null;
        }
    })
}))

function hideAction(){
    hidden.classList.replace("show", "hidden")
    for(let i =0 ; i<tasks.length; i++){
        tasksCheckbox[i].classList.replace("show", "hidden")
    }
}

console.log(tasks)
// localStorage.clear()