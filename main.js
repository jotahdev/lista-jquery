$(document).ready(function() {
    loadTasks();

    $('#task-form').on('submit', function(event) {
        event.preventDefault();

        var task = $('#task-input').val();

        addTask(task);

        saveTask(task);

        $('#task-input').val('');
    });

    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('strikethrough');

        updateTaskStatus($(this).text(), $(this).hasClass('strikethrough'));
    });
});

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.text, task.completed);
    });
}


function addTask(text, completed = false) {
    var li = $('<li>' + text + '</li>');
    if (completed) {
        li.addClass('strikethrough');
    }
    $('#task-list').append(li);
}


function saveTask(text) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateTaskStatus(text, completed) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        if (task.text === text) {
            task.completed = completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
