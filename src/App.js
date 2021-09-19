import React, {useState} from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';

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

export default function App() {
    const [newTask, setNewTask] = useState(''); //tast 변수의 추가와 setter 함수 추가

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask('');
    }; // task를 추가하는 함수 삽입

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
            </Container>
        </ThemeProvider>
    );
}