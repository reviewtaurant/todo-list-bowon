import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
}))`
    width: ${({ width }) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 25px;
    color: ${({ theme }) => theme.text};
`; // attrs를 이용해 placeholder 텍스트값을 props로 넘겨 받아 표시하게 함

const Input = ({placeholder}) => {
    const width = useWindowDimensions().width;

    return (
        <StyledInput 
            width={width} 
            placeholder={placeholder} 
            maxLength={50}
        />
    );
};

export default Input;