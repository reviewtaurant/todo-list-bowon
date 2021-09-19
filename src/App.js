import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: center;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container></Container>
        </ThemeProvider>
    );
}