<template>
	<div id="wrap">
		<h1>To-Do List By Vue3 <img src="./assets/retina.svg" class="logo" /></h1>
		<div class="new-task">
			<input type="text" v-model="taskDesc" placeholder="new task" @keyup.enter="addTask" class="form-control" />
			<buttom class="btn btn-block btn-lg btn-danger" @click="addTask">Add Task</buttom>
		</div>
        <transition enter-active-class="animated flipInX" appear>
            <div class="task-wrap">
                <transition-group name="flip-list" mode="out-in" tag="div">
                    <div class="to-do" key="to-do">
                        <h5 class="to-do-title">To-Do：</h5>
                        <Task v-for="(item, index) in toDo" :key="item.id" :task="item" @updateTask="updateTask"></Task>
                        <div class="task" v-show="notToDo">
                            <span class="complete-tips"><i class="fui-heart"></i>Great, everything is done~</span>
                        </div>
                    </div>
                    <div class="completed" key="completed">
                        <h5 class="complete-title">Complete：</h5>
                            <Task v-for="(item, index) in completed" :key="item.id" :task="item" @updateTask="updateTask"></Task>
                            <div class="task" v-show="notComplete">
                                <span class="complete-tips"><i class="fui-time"></i> Take action. You are the best~</span>
                            </div>
                    </div>
                </transition-group>
            </div>
        </transition>
	</div>
</template>

<script lang="ts">
import { ref, setup, reactive, computed, onMounted } from "vue"
import compositionApi from '../src/mixins/composition-api.js'
import mixin from '../src/mixins/mixin.js'

import Task from './components/Task.vue'

export default {
	name: 'App',
	components: {Task},
    mixins: [mixin],
    setup(props, context) {
        let { taskDesc, taskList, toDo, completed, notToDo, notComplete } = compositionApi()

        // let list = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [{name: 'test task1', id: 0, status: false}]
        // const taskDesc = ref('')
        // const taskList = reactive(list)
        // const toDo = computed(() => taskList.filter(item => !item.status))
        // const completed = computed(() => taskList.filter(item => item.status))
        // const notToDo = computed(() => taskList.every(item => item.status))
        // const notComplete = computed(() => taskList.every(item => !item.status))
        onMounted(() => {
            // console.log(context)
        })
        return {
            taskDesc,
            taskList,
            toDo,
            completed,
            notToDo,
            notComplete
        }
    },
    created() {
        console.log(this.mixinData)
    },
    methods: {
        addTask() {
            if(!this.taskDesc) return alert(`Please enter the task description(●'◡'●)`)
            let task = {name: this.taskDesc, id: Date.now(), status: false}
            this.taskDesc = ''
            this.taskList.push(task)
            this.saveToLocal()
        },
        updateTask({id, remove}) {
            let taskIndex = this.taskList.findIndex(item => item.id === id)
            if(remove) this.taskList.splice(taskIndex, 1)
            if(!remove) this.taskList[taskIndex].status = !this.taskList[taskIndex].status
            this.saveToLocal()
        },
        saveToLocal() {
            localStorage.setItem('taskList', JSON.stringify(this.taskList))
        }
    }
}

</script>

<style lang="scss" scoped>
#wrap {
	margin-top: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		color: white;
		text-align: center;
		font-size: 45px;
		height: 100px;
		line-height: 100px;
        .logo {
            width: 50px;
        }
	}
	.new-task {
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
		.form-control {
			height: auto;
			width: 300px;
			margin-right: 10px;
		}
		.btn-danger {
			font-weight: 600;
		}
	}
	.task-wrap {
		min-height: 500px;
		width: 600px;
		background-color: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 5px;
        .flip-list-move {
            transition: transform 1s;
        }
        .to-do-title {
            color: #e74c3c;
            margin-left: 6px;
        }
        .complete-title {
            color: #1abc9c;
            margin-left: 6px;
        }
	}
    .complete-tips {
        display: inline-block;
        width: 100%;
        text-align: center;
        i {
            color: #ff4b52;
        }
    }
}
</style>
