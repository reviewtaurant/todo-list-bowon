import React, {useState} from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

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
    const [isReady, setIsReady] = useState(false); // 데이터를 불러오기 위해 변수와 setter 함수 생성
    const [newTask, setNewTask] = useState(''); //task 변수의 추가와 setter 함수 추가

    const [tasks, setTasks] = useState({}); 
    //useState를 이용해 할 일 목록을 저장하고 관리할 tasks 변수 생성, setter 함수 생성

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }; // task에 저장된 데이터를 json 형태로 저장하는 함수

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }; // 저장한 json 데이터를 불러와서 파싱하는 함수

    const _addTask = () => {
        const ID = Date.now().toString();

        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };

        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    }; // task를 추가하는 함수 삽입

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    }; // task를 삭제하는 함수 삽입

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }; // 완료 기능을 수행하는 함수 삽입

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    }; // 수정 기능을 수행하는 함수 삽입

    const _handleTextChange = text => {
        setNewTask(text);
    }; //새로운 task를 추가하는 함수 삽입

    const _onBlur = () => {
        setNewTask('');
    }; // Input 컴포넌트가 포커스를 잃으면 추가 중이던 값을 초기화하는 함수 삽입

    return isReady ? (
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
                    onBlur={_onBlur} 
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse() // 역순으로 배열되게해서 최신 항목이 잘 보이게 함
                        .map(item => (
                            <Task 
                                key={item.id} 
                                item={item} 
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync={_loadTasks}
            onFinish={() => setIsReady(true)}
            onError={console.error}
        />
    );
}