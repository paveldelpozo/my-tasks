import Vue from 'vue'
import Task from "~/models/Task";

export default Vue.extend({
    data() {
        return {
            newTask: '' as string,
            tasks: [] as Task[],
            deletionConfirmDialog : false,
            deleteTaskIndex : null as null | number,
        }
    },
    computed: {
        tasksMessage(): string {
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
        },
    },
    watch: {
        tasks : {
            handler(): void {
                this.saveTasks();
            },
            deep: true
        }
    },
    methods: {
        focusNewTaskField() {
            (this.$refs.newTask as any).focus();
        },
        addTask(): void {
            if (this.newTask.length > 0) {
                this.tasks.push(new Task(this.newTask));
                this.saveTasks();
                this.newTask = '';
                this.focusNewTaskField();
            }
        },
        deleteTaskConfirm(index: number) : void {
            this.deleteTaskIndex = index;
            this.deletionConfirmDialog = true;
        },
        deleteTask(): void {
            if (this.deleteTaskIndex !== null) {
                this.tasks.splice(this.deleteTaskIndex, 1);

            }
            this.deletionConfirmDialog = false;
            this.focusNewTaskField()
        },
        saveTasks(): void {
            if (this.tasks.length > 0) {
                window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
            } else {
                window.localStorage.removeItem('tasks');
            }
        },
        loadTasks(): void {
            this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        }
    },
    mounted(): void {
        this.loadTasks();
        this.focusNewTaskField();
    }
})
