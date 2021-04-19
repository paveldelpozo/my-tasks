<template>
    <div class="container">
        <div>
            <Logo title="Hello World"/>

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

<script lang="ts" src="@/controllers/indexController.ts"></script>
<style src="@/styles/indexStyle.css" scoped></style>
