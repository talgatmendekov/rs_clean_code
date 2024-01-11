// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution..

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.querySelector(".task-row-wrapper__button"); // First button
var incompleteTaskHolder = document.querySelector(".incomplete-tasks-list"); // ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".completed-tasks-list"); // completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  // Input (checkbox)
  var checkBox = document.createElement("input"); // Checkbox
  // Label
  var label = document.createElement("label"); // Label
  // Input (text)
  var editInput = document.createElement("input"); // Text
  // Button.edit
  var editButton = document.createElement("button"); // Edit button

  // Button.delete
  var deleteButton = document.createElement("button"); // Delete button
  var deleteButtonImg = document.createElement("img"); // Delete button image

  label.innerText = taskString;
  label.className = "task-label";

  // Each element needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task-input";

  editButton.innerText = "Edit"; // InnerText encodes special characters; HTML does not.
  editButton.className = "edit-button";

  deleteButton.className = "delete-button";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  // And appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.task-input');
  var label = listItem.querySelector(".task-label");
  var editBtn = listItem.querySelector(".edit-button");
  var containsClass = listItem.classList.contains("edit-mode");
  // If the class of the parent is .editmode
  if (containsClass) {
    // Switch to .editmode
    // Label becomes the input's value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};

// Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

// Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  // Select ListItems children
  var checkBox = taskListItem.querySelector(".task-checkbox");
  var editButton = taskListItem.querySelector(".edit-button");
  var deleteButton = taskListItem.querySelector(".delete-button");

  // Bind editTask to edit button.
  editButton.addEventListener("click", editTask);
  // Bind deleteTask to delete button.
  deleteButton.addEventListener("click", deleteTask);
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.addEventListener("change", checkBoxEventHandler);
};

// Cycle over incompleteTaskHolder ul list items
// for each list item
incompleteTaskHolder.querySelectorAll('.task-item').forEach(function (item) {
  // Bind events to list items children (tasksCompleted)
  bindTaskEvents(item, taskCompleted);
});

// Cycle over completedTasksHolder ul list items
completedTasksHolder.querySelectorAll('.completed-task-item').forEach(function (item) {
  // Bind events to list items children (tasksIncompleted)
  bindTaskEvents(item, taskIncomplete);
});

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks.

// Change edit to save when you are in edit mode.......
