<template>
    <div class="tasks">
        <v-row>
            <v-col class="text-center">
                <img
                    src="/v.png"
                    alt="Vuetify.js"
                    class="mb-5"
                >
                <h1>My Tasks</h1>
                <v-card width="600" class="mx-auto">
                    <v-card-text>
                        <v-text-field
                            placeholder="What I need to do?"
                            solo
                            autofocus
                            ref="newTask"
                            v-model="newTask"
                            @keyup.enter="addTask()"
                            append-outer-icon="mdi-plus"
                            @click:append-outer="addTask()"
                            hide-details
                        ></v-text-field>

                        <v-list
                            dense
                            class="text-left"
                        >
                            <template
                                v-for="(task, index) in tasks"
                            >
                                <v-list-item
                                    :key="index"
                                >
                                    <v-list-item-icon>
                                        <v-simple-checkbox
                                            color="red"
                                            v-model="task.status"
                                            hide-details
                                        ></v-simple-checkbox>
                                    </v-list-item-icon>

                                    <v-list-item-content
                                        @click="task.status = !task.status"
                                        v-ripple
                                        class="subtitle-1 cursor"
                                    >
                                        <v-list-item-title
                                            :class="{ done : task.status }"
                                            v-text="task.description"
                                        ></v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action class="ma-0">
                                        <v-btn
                                            icon
                                            @click="deleteTaskConfirm(index)"
                                            v-if="task.status"
                                        >
                                            <v-icon color="red">mdi-delete</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>

                                <v-divider></v-divider>
                            </template>

                        </v-list>
                        <h4 class="caption grey--text">{{ tasksMessage }}</h4>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="deletionConfirmDialog" width="400">
            <v-card>
                <v-card-title>
                    Confirmation
                    <v-spacer></v-spacer>
                    <v-btn icon @click="deletionConfirmDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    Are you sure to delete selected task?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn outlined color="error">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteTask()">Yes, delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" src="@/controllers/pages/IndexController.ts"></script>

<style scoped>
.cursor {
    cursor: pointer;
}
.done {
    text-decoration:line-through;
    color: red;
}
</style>
