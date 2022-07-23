import {v1} from 'uuid';
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask, setTaskEntityStatus,
    setTasks,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {TASK_STATUS, TaskPriority} from '../../../../dal/api/todolist-api';
import {REQUEST_STATUS} from '../app-reducer/app-reducer';


let startState: TasksStateType;
let todolistId1: string;
let todolistId2: string;
let todolistId3: string;
let taskName: string;

beforeEach(() => {

    taskName = 'Learn English'
    todolistId1 = v1();
    todolistId2 = v1();
    todolistId3 = v1();

    startState = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'JS',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'HTML&CSS2',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'JS2',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'ReactJS2',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'Rest API2',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
            {
                id: v1(),
                title: 'GraphQL2',
                status: TASK_STATUS.Completed,
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                description: '',
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 1,
                entityStatus: REQUEST_STATUS.IDLE
            },
        ],
        [todolistId3]: []
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTask({
        todolistID: todolistId1,
        taskId: startState[todolistId1][0].id
    }))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe('JS');
    expect(endState[todolistId2].length).toBe(5);
    expect(endState[todolistId2][0].title).toBe('HTML&CSS2');
});

test('correct task should be added', () => {
    const task = {
        addedDate: '',
        deadline: '',
        description: '',
        id: 'any',
        order: 1,
        priority: TaskPriority.Low,
        startDate: '',
        status: TASK_STATUS.New,
        title: taskName,
        todoListId: todolistId1
    };
    const endState = tasksReducer(startState, addTask({task}));

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId1][0].title).toBe(taskName);
    expect(endState[todolistId2].length).toBe(5);
    expect(endState[todolistId2][0].title).toBe('HTML&CSS2');
});

test('correct task should change its name', () => {

    const endState = tasksReducer(startState, changeTaskTitle({
        todolistId: todolistId1,
        taskId: startState[todolistId1][1].id,
        newTitle: taskName
    }));

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].title).toBe('HTML&CSS');
    expect(endState[todolistId1][1].title).toBe(taskName);
});

test('correct task should change its status', () => {

    const endState = tasksReducer(startState, changeTaskStatus({
        todolistID: todolistId1,
        taskId: startState[todolistId1][1].id,
        status: TASK_STATUS.New
    }));

    expect(endState[todolistId1][1].status).toBe(TASK_STATUS.New);
    expect(endState[todolistId2][1].status).toBe(TASK_STATUS.Completed);
});

test('tasks should be correct set', () => {

    const tasks = [
        {
            id: v1(),
            title: 'Test Task',
            status: TASK_STATUS.Completed,
            priority: TaskPriority.Low,
            todoListId: todolistId2,
            description: '',
            deadline: '',
            startDate: '',
            addedDate: '',
            order: 1
        },
    ]
    const endState = tasksReducer(startState, setTasks({todolistId: todolistId3, tasks}));

    expect(endState[todolistId3].length).toBe(1);
    expect(endState[todolistId3][0].title).toBe('Test Task');
});

test('tasks entity status should be set correct', () => {

    const endState = tasksReducer(startState,
        setTaskEntityStatus({
            todolistId: todolistId2,
            taskId: startState[todolistId2][0].id,
            entityStatus: REQUEST_STATUS.LOADING
        }));

    expect(endState[todolistId2][0].entityStatus).toBe(REQUEST_STATUS.LOADING);
});