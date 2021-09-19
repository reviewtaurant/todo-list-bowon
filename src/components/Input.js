import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
    width: ${({ width }) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 25px;
    color: ${({ theme }) => theme.text};
`;

const Input = () => {
    const width = useWindowDimensions().width;

    return <StyledInput width={width}/>;
};

export default Input;