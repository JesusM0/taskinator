var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//Create a counter that will increment by one each time a task is created
var taskIdCounter = 0;
//Reference for page-content id on the main element
var pageContentEl = document.querySelector("#page-content");

//Here in this function, we are collecting the data for the task(name, type) and sending it to the createTaskEl function
var taskFormHandler = function() {

    //preventDefault stop the browser from reloading after submitting a task.
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //This if statement checks to see if anything was written into the forms using the !(not) operator. Also known as falsy values
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
    
    //Set task-id as custom attribute to created list items(li).
    //It will be connected to the taskIdCounter which will give each created list item its own unique Id
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // inner.HTML allows us to create a new element without it becoming a string.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increments taskIdCounter each time a list item is created for next unique ID
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Edit Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    //We are giving the button element two classes(btn, edit-btn)
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Delete Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        //Options for select dropdown
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        //Appending to select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

//submit here allows us to submit the form using both a button and the ENTER key
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    //Retrieve target element from event(click)
    var targetEl = event.target;

    //Edit button clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //Delete Button Clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    //we're selecting a list item using .task-item, and we're further narrowing the search by looking for a .task-item that has a data-task-id equal to the argument we've passed into the function
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);
