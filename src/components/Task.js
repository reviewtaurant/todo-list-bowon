import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

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
    color: ${({ theme }) => theme.text};
`;

const Task = ({ item, deleteTask }) => { // props로 할 일 내용이 전달됨
    return (
        <Container>
            <IconButton type={images.uncompleted} />
            <Contents>{item.text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} />
        </Container>
    ); //완료, 추가, 삭제 버튼이 추가됨
};

Task.propTypes = {
    item: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
}; // props의 형식에 propTypes 작성

export default Task;
