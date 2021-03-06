import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../../bll/ReduxStoreProviderDecorator';
import {useAppSelector} from 'hooks';


export default {
    title: 'Todolist/Components/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    args: {}, // для всех историй будут использоваться компоненты, указанные в этом объекте
    argTypes: {
        todolistId: {
            description: 'Id todolist'
        },
        task: {
            description: 'object which contains id, title and isDone properties'
        }
    },
} as ComponentMeta<typeof Task>;

const TaskWithDispatch = (props: any) => { // на случай если еще захочу прокидывать в нее еще что-то кроме того, что берем из Redux

    const task = useAppSelector(state => state.tasks['todolistId1'][0]);

    return (
        <Task todolistId={'todolistId1'} task={task} {...props}/>
    )
}

const Template: ComponentStory<typeof TaskWithDispatch> = (args) => <TaskWithDispatch {...args}/>;

export const TaskBaseExample = Template.bind({});
