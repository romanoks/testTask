import React, {useReducer, useState} from "react";
import PropTypes from "prop-types";
import {Button, Comment, Input, List, Modal, Form, Card, Tooltip, Select} from "antd";
import Avatar from "antd/es/avatar/avatar";
import EditorChat from "../editor/EditorChat";
import moment from "moment";
import {Option} from "antd/es/mentions";

import "./ChatComponent.css"

const {TextArea} = Input;

function ChatComponent(props) {
    const {handleModalOk, names, chatObject, handleSend} = props;
    const [data, setData] = useState(chatObject.chat);
    const [inputName, setInputName] = useState('');
    const [inputName2, setInputName2] = useState('');
    const [editValue, setEditValue] = useState('');
    const [activeUser, setActiveUser] = useState(undefined);
    const [disableButtonSend, setDisableButtonSend] = useState(activeUser == undefined);

    const [visibleModal, setVisibleModal] = useState(names === undefined || names.length === 0
        || names[0].length === 0
        || names[1].length === 0);

    const registerPerson = () => {
        return <Modal
            title={"RegistrationForm"}
            visible={visibleModal}
            onOk={handleModalOkIn}
            closable={false}
            cancelButtonProps={{disabled: true}}>
            <Input value={inputName} onChange={e => setInputName(e.target.value)} placeholder={"Write name User1"}/>
            <Input value={inputName2} onChange={e => setInputName2(e.target.value)} placeholder={"Write name User2"} />
        </Modal>
    }

    const handleChangeEditForm = e => {
        setEditValue(e.target.value);
    }

    const handleAddComment = () => {
        handleSend({message: editValue, author: activeUser, timeId: moment.now()});
        setEditValue('');
    }

    const handleModalOkIn = () => {
        handleModalOk([inputName, inputName2])
            .then(() => setVisibleModal(false))
            .catch((e) => console.log(e))
    }

    const getOptional = () => {
        return names.map(item => <Option value={item.toLowerCase()}>{item}</Option> );
    }

    return (
        <Card className={"card-position"}>
            <Select
                className={"select-width"}
                onChange={(e) => {
                setActiveUser(e)
                    setDisableButtonSend(false);
            }}>
                {getOptional()}
            </Select>
            {registerPerson()}
            <List
                style={{background: 'beige'}}
                headers={`${data === undefined || data.chat === undefined ? 0 : data.chat.length} messages`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <Comment className={`chat-border ${item.author === activeUser 
                        ? 'chat-owner-comments' 
                        : 'chat-opponent-comments'}` } content={<p>{item.message}</p>}
                             avatar={
                                 <Avatar
                                     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                     alt={'avatar'}
                                 />}
                             author={item.author === activeUser ? 'me' : item.author}
                             datetime={
                                 <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                     <span>{moment().fromNow()}</span>
                                 </Tooltip>
                             }
                    />
                )}
            />
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt={'avatar'}
                    />}
                content={<EditorChat
                    onSubmit={handleAddComment}
                    onChange={handleChangeEditForm}
                    value={editValue}
                    disabled={disableButtonSend}/>}
            />
        </Card>
    )
}

ChatComponent.propTypes = {
    chatObject: PropTypes.object.isRequired,
    names: PropTypes.array.isRequired,
    handleModalOk: PropTypes.func.isRequired,
    handleSend: PropTypes.func.isRequired
}

export default ChatComponent;