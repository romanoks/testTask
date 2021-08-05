import {Button, Form} from "antd";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";

const EditorChat = ({onChange, onSubmit, submitting, value, disabled}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={disabled}>
                Add Comment
            </Button>
        </Form.Item>
    </>
);

EditorChat.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
}

export default EditorChat;