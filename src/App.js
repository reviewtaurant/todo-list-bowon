import React from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`; // SafeAreaView로 아이폰 노치 디자인 문제 해결

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input />
            </Container>
        </ThemeProvider>
    );
}// StatusBar를 이용하여 상태 바와 컴포넌트가 겹치지 않게 함