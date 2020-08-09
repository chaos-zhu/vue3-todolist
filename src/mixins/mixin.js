import { ref, reactive, computed } from "vue"
// 导出一个function，return响应式对象
export default function() {
    let list = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [{name: 'test task1', id: 0, status: false}]
    const taskDesc = ref('')
    const taskList = reactive(list)
    const toDo = computed(() => taskList.filter(item => !item.status))
    const completed = computed(() => taskList.filter(item => item.status))
    const notToDo = computed(() => taskList.every(item => item.status))
    const notComplete = computed(() => taskList.every(item => !item.status))
    return {
        taskDesc,
        taskList,
        toDo,
        completed,
        notToDo,
        notComplete
    }
}