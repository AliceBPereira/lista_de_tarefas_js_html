const localStorageKey= 'to-do-list';
function newTask(){
    let input = document.getElementById('input-new-task')
    input.style.border = ''; //reset border color
   
    //validation
    if(!input.value){
        input.style.border = '1px solid red';
        alert('Please enter a task');
    }
    else if(validateNewTask()){
        alert('Task already exists');
        input.value = '';
        return;
    }
    else{
       // increment to localstorage  

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

        values.push({
            name: input.value,
        });
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = '';
}

function validateNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(item => item.name == inputValue)
    return !exists ? false : true;

}
function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''; 
    console.log(values)
    for(let i =0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>ok</button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(item => item.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

showValues()