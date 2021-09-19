import PropTypes from 'prop-types';
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

const Input = ({
    placeholder,
    value, 
    onChangeText, 
    onSubmitEditing,
    onBlur,
}) => {
    const width = useWindowDimensions().width;

    return (
        <StyledInput 
            width={width} 
            placeholder={placeholder} 
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
        />
    ); // props로 전달되는 값을 설정함
};

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
}; //propsTypes를 이용해 전달되는 값들의 타입과 필수 여부를 지정

export default Input;