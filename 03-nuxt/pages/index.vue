<template>
    <div class="container">
        <div>
            <Logo/>
            <h1 class="title">
                My Tasks
            </h1>
            <div class="text">
                <label for="newTask">What I need to do?</label><br>
                <input ref="newTask" id="newTask" type="text" placeholder="What I need to do?" v-model="newTask"
                       @keyup.enter="addTask()" class="text">
                <button type="button" @click="addTask()" class="text">Add Task</button>
            </div>
            <div class="subtitle">{{ tasksMessage }}</div>
            <ul>
                <li v-for="(task, index) in tasks" :key="index" class="text">
                    <label>
                        <input class="text" type="checkbox" v-model="task.status">
                        {{ task.description }}
                        <button type="button" @click="deleteTask(index)" v-if="task.status" class="text">Delete</button>
                    </label>
                </li>
            </ul>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Task from "~/models/Task";

export default Vue.extend({
    data() {
        return {
            newTask: '' as string,
            tasks: [] as Task[]
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
        }
    },
    watch: {
        tasks(tasks: Task[]): void {
            if (tasks.length > 5) {
                alert(`You should finish the above tasks earlier, don't you think?`)
            }
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
        deleteTask(index: number): void {
            if (window.confirm(`Are you sure to delete this task?`)) {
                this.tasks.splice(index, 1);
                this.saveTasks();
            }
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
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.text {
    font-size: 24px;
}

ul {
    list-style-type: none;
}
</style>
