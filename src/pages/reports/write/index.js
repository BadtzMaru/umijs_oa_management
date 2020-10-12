/*
    title: 写周报
*/
import React, { Component } from 'react';
import { Input, Form, Select, Button } from 'antd';
import E from 'wangeditor';

import { Content } from '@/components/Layout';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: null,
            editorCheck: true,
        };
    }
    componentDidMount() {
        this.initEditor();
    }
    initEditor() {
        const editor = new E(this.refs.editorRef);
        // 监听内容
        editor.config.onchange = html => {
            let editorCheck = true;
            if (!html || html === '<p><br></p>') {
                editorCheck = false;
            }
            this.setState({
                editorContent: html,
                editorCheck,
            });
        };
        editor.create();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { editorCheck } = this.state;
        return (
            <Content>
                <Form>
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [
                                { required: true, message: '周报标题不能为空' }
                            ],
                        })(
                            <Input placeholder="请输入周报标题" />
                        )}
                    </Form.Item>
                    <Form.Item label="接收人">
                        {getFieldDecorator('receiverId', {
                            rules: [
                                { required: true, message: '接受人不能为空' }
                            ],
                        })(
                            <Select placeholder="请选择接受人"></Select>
                        )}
                    </Form.Item>
                    <Form.Item label="内容" required>
                        <div ref="editorRef" style={!editorCheck ? { border: '1px solid red' } : { border: '1px solid #eee' }} />
                        {!editorCheck && <p style={{ color: 'red' }}>内容不能为空</p>}
                    </Form.Item>
                    <Form.Item className="action">
                        <Button>取消</Button>
                        <Button type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </Content >
        );
    }
}

export default Form.create()(index);
