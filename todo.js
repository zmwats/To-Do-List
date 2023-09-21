// todo.js
document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('tasks');

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const task = taskInput.value.trim(); // Remove leading/trailing whitespace

        if (task === '') {
            return; // Do not submit empty tasks
        }

        // Send a POST request to the Flask server to add the task
        fetch('/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `task=${encodeURIComponent(task)}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Task added successfully') {
                // Refresh the page to display the updated task list
                location.reload();
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Add code for task deletion here
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            const taskElement = event.target.parentElement;
            const taskIndex = Array.from(taskElement.parentElement.children).indexOf(taskElement);

            // Send a POST request to the Flask server to delete the task
            fetch(`/delete_task/${taskIndex}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Task deleted successfully') {
                    // Remove the task element from the list
                    taskElement.remove();
                } else {
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});


