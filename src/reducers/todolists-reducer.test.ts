import {v1} from 'uuid';
import {FilterValuesType, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {addTodolistAC, changeFilterAC, changeTodolistNameAC, removeToDoListAC} from './action-creators/action-creators';

let startState: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;
let newTodolistTitle: string;
let newFilter: FilterValuesType;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = 'New Title';
    newFilter = 'completed'

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 1, addedDate: '', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeToDoListAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolist = {
        addedDate: '',
        id: v1(),
        order: 1,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistNameAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(startState).not.toEqual(endState);
});

test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});