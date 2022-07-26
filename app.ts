

const form = getSingleHTMLElement('.form') as HTMLFormElement;
const tasklist =  getSingleHTMLElement('.collections') as HTMLUListElement;
const clearTaskBTN = getSingleHTMLElement('.cleartask');
const filter = getSingleHTMLElement('#filter');
const taskInput = getSingleHTMLElement('#task') as HTMLInputElement;

// Load all events function
loadAllEvent()

// Events Function
function loadAllEvent(){
    document.addEventListener('DOMContentLoaded',loadLocalStorage)
    form?.addEventListener('submit', addTask);
    tasklist?.addEventListener('click', removeTask);
    clearTaskBTN?.addEventListener('click', clearTask);
    filter?.addEventListener('keyup', filterTask);
};

// Add Function
function addTask(e:any){
    const taskValue = (taskInput.value).trim();
    if(taskValue === ''){
        e.preventDefault();

        return  console.log('this is empty string');
    }
    // Create HTML element
    // 
    const li = createHTMLElement('li');
    const liValue = document.createTextNode(taskValue);
    // 
    const anchor = createHTMLElement('a');

    // Appending Elements
    li.classList.add('collection-item');
    anchor.classList.add('delete-item', 'secondary-content');
    anchor.innerHTML = `<i  class="fa fa-remove"></i>`;
    // 
    li.appendChild(liValue);
    li.appendChild(anchor);
    tasklist.appendChild(li);
    addToLocalStorage(taskValue);

    // Clear
    taskInput.value = '';
    e.preventDefault();
    
};

// Remove Task
function removeTask(e:any){
    console.group('%cBeginning of  function',' background-color: green; padding: 0.5em, 1em')
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(`Conditions met 
        item removed`);
        removefromLS(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.remove();
    }

}

//Clear Task
function clearTask(e:any){
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();

}

// Filter Task
function filterTask(e:any){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(
        (task:any)=>{
            const textV = task.firstChild?.textContent;
            if(textV?.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else{
                task.style.display = 'none';
            }
        }
    )
}



function getSingleHTMLElement(element:string):HTMLElement | null  {
    return document.querySelector(element);// getting element from the DOM
};
function createHTMLElement(ele:string):HTMLElement{
    return document.createElement(ele);
}
function addToLocalStorage(value:string){
    const tasks = (!localStorage.getItem('tasks'))?[]: JSON.parse(localStorage.getItem('tasks'));
    tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadLocalStorage(){
    console.log('Loaded local storage')
    const tasks = (!localStorage.getItem('tasks'))?[]: JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task:any) =>{
            // Create HTML element
    // 
    const li = createHTMLElement('li');
    const liValue = document.createTextNode(task);
    
    const anchor = createHTMLElement('a');
    // Appending Elements
    li.classList.add('collection-item');
    anchor.classList.add('delete-item', 'secondary-content');
    anchor.innerHTML = `<i  class="fa fa-remove"></i>`;
    // 
    li.appendChild(liValue);
    li.appendChild(anchor);
    tasklist.appendChild(li);
    })
}

function removefromLS(element:any){
    const tasks = (!localStorage.getItem('tasks'))?[]: JSON.parse(localStorage.getItem('tasks'));
tasks.forEach((task:any, index:number)=>{
if(element.textContent === task){
    console.log(task, index);
    tasks.splice(index,1)
}


})
localStorage.setItem('tasks', JSON.stringify(tasks))
}