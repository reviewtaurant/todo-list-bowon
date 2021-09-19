import React, {useState} from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`; //ScrollView를 이용해 리스트가 많아져도 스크롤로 확인 가능

const width = Dimensions.get('window').width;

export default function App() {
    const [newTask, setNewTask] = useState(''); //task 변수의 추가와 setter 함수 추가

    const [tasks, setTasks] = useState({
        '1': { id: '1', text: 'Hanbit', completed: false },
        '2': { id: '2', text: 'React Native', completed: true },
        '3': { id: '3', text: 'React Native Sample', completed: false },
        '4': { id: '4', text: 'Edit TODO Item', completed: false },
    }); //useState를 이용해 할 일 목록을 저장하고 관리할 tasks 변수 생성, setter 함수 생성

    const _addTask = () => {
        const ID = Date.now().toString();

        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };

        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    }; // task를 추가하는 함수 삽입

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    }; // task를 삭제하는 함수 삽입

    const _handleTextChange = text => {
        setNewTask(text);
    }; //새로운 task를 추가하는 함수 삽입

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input 
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask} 
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse() // 역순으로 배열되게해서 최신 항목이 잘 보이게 함
                        .map(item => (
                            <Task key={item.id} item={item} deleteTask={_deleteTask}/>
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}