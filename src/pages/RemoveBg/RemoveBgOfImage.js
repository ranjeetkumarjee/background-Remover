import React from 'react';
import styled from './removebgofimage.module.css';
import UserImageInput from '../../components/UserFileInput/UserImageInput';

const RemoveBgOfImage = () => {
  return (
    <div className={styled.user_input_sec}>
        <h2>Remove Background</h2>
        <div className={styled.user_input_container}>
            <UserImageInput />
        </div>
    </div>
  )
}

export default RemoveBgOfImage;