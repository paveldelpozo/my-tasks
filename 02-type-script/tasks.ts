class Task {
    status : boolean
    description : string

    constructor(description) {
        this.status = false;
        this.description = description;
    }
}

// @ts-ignore
let app = new Vue({
    el: '#app',
    data: {
        newTask: '' as string,
        tasks: [] as Task[]
    },
    computed: {
        tasksMessage() : string {
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
        tasks(tasks : Task[]) : void {
            if (tasks.length > 5) {
                alert(`You should finish the above tasks earlier, don't you think?`)
            }
        }
    },
    methods: {
        addTask() : void {
            if (this.newTask.length > 0) {
                this.tasks.push(new Task(this.newTask));
                this.saveTasks();
                this.newTask = '';
                this.$refs.newTask.focus();
            }
        },
        deleteTask(index : number) : void {
            if (window.confirm(`Are you sure to delete this task?`)) {
                this.tasks.splice(index, 1);
                this.saveTasks();
            }
        },
        saveTasks() : void {
            if (this.tasks.length > 0) {
                window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
            } else {
                window.localStorage.removeItem('tasks');
            }
        },
        loadTasks() : void {
            this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        }
    },
    mounted() : void {
        this.loadTasks();
        this.$refs.newTask.focus();
    }
})
