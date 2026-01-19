const timestamp = Date.now()
const date = new Date(timestamp);
const getMonth = date.toLocaleDateString('default', {month: 'long'})
const getYear = date.getFullYear();
const getDay = date.getDate();

const createTask = document.getElementById("createTask");
const task = document.getElementById("task")

let i = 1;
export class Task{
    constructor(task){
        this.id = i++;
        this.task = task;
        this.status = "pending";
        this.createdAt = `${getMonth} ${getDay}, ${getYear}`;
    }
    
    makeTask(){
        localStorage.setItem(this.id, JSON.stringify(this.id, this.task, this.status, this.createdAt))
        const getTask = JSON.parse(localStorage.getItem(this.id))
        console.log(getTask)
    }
}
