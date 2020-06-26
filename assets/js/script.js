var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//Here in this function, we are collecting the data for the task(name, type)
//and sending it to the createTaskEl function
var taskFormHandler = function() {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //This if statement checks to see if anything was written into the forms using the !(not) operator
    //Also known as falsy values
    if (!taskNameInput || !taskTypeInput) {
        alert("Task form must be filled out completley!");
        //Return false here means If a form field is empty, then function alerts a message, and returns false, to prevent the form from being submitted.
        return false;
    }

    //.reset() is a <form> exclusive method that resets the form to its default state after submission... or so i think for now.
    formEl.reset();

    //Turn taskDataObj into an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //Send it back to the createTaskEl function with its content
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    //Assign Class from HTML using (name of variable).className = "";
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // inner.HTML allows us to create a new element without it becoming a string.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);
