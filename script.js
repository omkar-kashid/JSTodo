
window.addEventListener('load', function () {
    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');
    const tasksDiv = document.getElementById('tasksDiv');


    // render tasks from localStorage

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        renderTasks(task);
    })


    addButton.addEventListener('click', () => {
        if (!taskInput.value) return;
        let task = {
            task: taskInput.value,
            id: Date.now(),
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(task);
        taskInput.value = '';
    });

    tasksDiv.addEventListener('click',(e)=>{
        e.stopPropagation();
       
        if(e.target.classList.contains('delete-btn')){
            const li = e.target.closest('li');
            const id = li.getAttribute('dataid');
            li.remove();
            tasks = tasks.filter(task => task.id !== parseInt(id));
            localStorage.setItem('tasks',JSON.stringify(tasks));
            return;
        }

        const li = e.target.closest('li');
        if(!li) return;
        const id = li.getAttribute('dataid');
        li.classList.toggle('completed');
        tasks = tasks.map(task => task.id === Number(id) ? {...task,completed:true} : task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        

    });


});

function renderTasks(task) {
    const tasksDiv = document.getElementById('tasksDiv');

    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = '&times;';
    button.classList.add('delete-btn');
    li.textContent = `${task.task}`;
    li.setAttribute('dataid',task.id);
    if(task.completed){
        li.classList.add('completed');
    }
    li.appendChild(button);
    tasksDiv.appendChild(li);
}