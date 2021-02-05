let app = new Vue({
    el: '#app',
    data: {
        newTask: '',
        tasks: []
    },
    computed: {
        tasksMessage() {
            if (this.tasks.length === 0) {
                return `You don't have any task yet`;
            } else {
                let tasksDone = this.tasks.filter(task => task.status).length;
                let tasksPending = this.tasks.length - tasksDone;
                if (tasksPending === 0) {
                    return `Great work! You have all tasks (${tasksDone}) done!`;
                } else {
                    return `You have ${tasksPending} tasks pending, ${tasksDone} task done`;
                }
            }
        }
    },
    watch : {
        tasks(tasks) {
            if (tasks.length > 5) {
                alert(`You should finish the above tasks earlier, don't you think?`)
            }
        }
    },
    methods: {
        addTask() {
            if (this.newTask.length > 0) {
                this.tasks.push({
                    status : false,
                    description : this.newTask,
                });
                this.saveTasks();
                this.newTask = '';
                this.$refs.newTask.focus();
            }
        },
        deleteTask(index) {
            if (window.confirm('Are you sure to delete this task?')) {
                this.tasks.splice(index, 1);
                this.saveTasks();
            }
        },
        saveTasks() {
            if (this.tasks.length > 0) {
                window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
            } else {
                window.localStorage.removeItem('tasks');
            }
        },
        loadTasks() {
            this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        }
    },
    mounted() {
        this.loadTasks();
        this.$refs.newTask.focus();
    }
})
