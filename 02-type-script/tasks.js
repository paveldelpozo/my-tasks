var Task = /** @class */ (function () {
    function Task(description) {
        this.status = false;
        this.description = description;
    }
    return Task;
}());
// @ts-ignore
var app = new Vue({
    el: '#app',
    data: {
        newTask: '',
        tasks: []
    },
    computed: {
        tasksMessage: function () {
            if (this.tasks.length === 0) {
                return "You don't have any task yet";
            }
            else {
                var tasksDone = this.tasks.filter(function (task) { return task.status; }).length;
                var tasksPending = this.tasks.length - tasksDone;
                if (tasksPending === 0) {
                    return "Great work! You have all tasks (" + tasksDone + ") done!";
                }
                else {
                    return "You have " + tasksPending + " tasks pending, " + tasksDone + " task done";
                }
            }
        }
    },
    watch: {
        tasks: function (tasks) {
            if (tasks.length > 5) {
                alert("You should finish the above tasks earlier, don't you think?");
            }
        }
    },
    methods: {
        addTask: function () {
            if (this.newTask.length > 0) {
                this.tasks.push(new Task(this.newTask));
                this.saveTasks();
                this.newTask = '';
                this.$refs.newTask.focus();
            }
        },
        deleteTask: function (index) {
            if (window.confirm("Are you sure to delete this task?")) {
                this.tasks.splice(index, 1);
                this.saveTasks();
            }
        },
        saveTasks: function () {
            if (this.tasks.length > 0) {
                window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
            else {
                window.localStorage.removeItem('tasks');
            }
        },
        loadTasks: function () {
            this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        }
    },
    mounted: function () {
        this.loadTasks();
        this.$refs.newTask.focus();
    }
});
