import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`;

const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
    text-decoration-line: ${({ completed }) => 
        completed ? 'line-through' : 'none'};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => { // props로 할 일 내용이 전달됨
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리를 위한 변수 생성 및 setter 함수 생성

    const [text, setText] = useState(item.text); // 수정되는 내용을 담을 text 변수 및 setter 함수 생성

    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }; // 수정버튼을 누르면 수정여부를 결정하는 변수를 변경

    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, { text });
            setIsEditing(false);
            updateTask(editedTask);
        }
    }; // 수정버튼이 제출되었을때 내용을 받아서 수정하는 함수

    const _onBlur = () => {
        if (isEditing) {
        setIsEditing(false);
        setText(item.text);
        }
    }; // Input 컴포넌트가 포커스를 잃었을 때 초기화하는 함수

    // isEditing 변수의 값에 따라 리턴 값이 다르게 렌더링됨
    return isEditing ? (
        <Input
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSubmitEditing}
            onBlur={_onBlur}
        />
    ) : (
        <Container>
            <IconButton 
                type={item.completed ? images.completed : images.uncompleted}
                id={item.id}
                onPressOut={toggleTask}
                completed={item.completed}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {item.completed || (
                <IconButton 
                    type={images.update}
                    onPressOut={_handleUpdateButtonPress}
                />
            )}
            <IconButton 
                type={images.delete} 
                id={item.id} 
                onPressOut={deleteTask}
                completed={item.completed} 
            />
        </Container>
    ); //완료, 추가, 삭제 버튼이 추가됨
};

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
}; // props의 형식에 propTypes 작성

export default Task;
