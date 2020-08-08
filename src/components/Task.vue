<template>
    <div class="task" @click="updateTask(false)">
        <label class="checkbox" for="checkbox">
            <input type="checkbox" :checked="task.status" data-toggle="checkbox" class="custom-checkbox" />
            <span class="icons" >
                <span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
            </span>
            <span :class="['task-content', task.status ? 'complete-task' : 'not-complete-task']">{{task.name}}</span>
            <span class="fui-trash" @click.stop="updateTask(true)"></span>
        </label>
    </div>
</template>

<script>
import { reactive, onMounted } from "vue"
export default {
    name: 'Task',
    props: {
        task: {
            default: {name: '', status: false},
            type: Object,
            required: true
        },
        // isNothing: {
        //     default: true,
        //     type: Boolean,
        //     required: true
        // }
    },
    setup(props, context) {
        const ctx = reactive(context)
        onMounted(() => {
            // setInterval(() => {
            // },1000)
        })
        return {ctx}
    },
    methods: {
        updateTask(remove = false) {
            this.ctx.emit('updateTask', {id: this.task.id, remove})
        },
    },
}
</script>

<style lang="scss">
    .task {
        cursor: pointer;
        box-sizing: border-box;
        height: 50px;
        background-color: #d6d6d6;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        &:hover {
            background-color: #d8d8d8;
            // color: #ff4b52;
        }
        .checkbox {
            cursor: pointer;
            margin-bottom: 0;
            width: 95%;
            display: flex;
            align-items: center;
            position: relative;
            .task-content {
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .complete-task {
                text-decoration: line-through;
                color: #27AE60;
            }
            .not-complete-task {
                color: #ff0b0b;
            }
            .fui-trash {
                position: absolute;
                right: 10px;
                transition: all 0.5s;
                &:hover {
                    color: red;
                    font-size: 15px;
                }
            }
        }
    }
</style>
