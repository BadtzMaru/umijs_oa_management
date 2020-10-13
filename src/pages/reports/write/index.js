/*
    title: 写周报
*/
import React, { Component } from 'react';
import { Input, Form, Select, Button, Message } from 'antd';
import E from 'wangeditor';
import { connect } from 'dva';
import { router } from 'umi';

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
        this.getAllUsers();
    }
    getAllUsers() {
        this.props.dispatch({
            type: 'reports/getAllUsers'
        }).then(res => {
            this.renderUsers();
        });
    }
    renderUsers() {
        const { allUsersList } = this.props;
        return (
            <Select placeholder="请选择接收人">
                {allUsersList.map(({ username, nickname }, index) => (
                    <Select.Option value={username} key={index}>{nickname}</Select.Option>
                ))}
            </Select>
        );
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
    // 提交周报
    handleOk = () => {
        const { editorCheck, editorContent } = this.state;
        // 表单校验
        this.props.form.validateFields((err, value) => {
            if (!err) {
                // 校验编辑器
                if (editorContent && editorCheck) {
                    // 发起请求
                    this.props.dispatch({
                        type: 'reports/add',
                        payload: { ...value, content: editorContent },
                    })
                        .then(res => {
                            if (res && res.state === 'success') {
                                Message.success(res.msg || '周报提交成功');
                                router.push('/reports');
                            } else {
                                Message.error(res.msg || '提交失败');
                            }
                        });
                } else {
                    this.setState({
                        editorCheck: false,
                    });
                }
            }
        });
    };
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
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '接受人不能为空' }
                            ],
                        })(this.renderUsers())}
                    </Form.Item>
                    <Form.Item label="内容" required>
                        <div ref="editorRef" style={!editorCheck ? { border: '1px solid red' } : { border: '1px solid #eee' }} />
                        {!editorCheck && <p style={{ color: 'red' }}>内容不能为空</p>}
                    </Form.Item>
                    <Form.Item className="action">
                        <Button>取消</Button>
                        <Button loading={this.props.loading} type="primary" onClick={this.handleOk}>提交</Button>
                    </Form.Item>
                </Form>
            </Content >
        );
    }
}

export default connect(({ reports, loading }) => ({
    ...reports,
    loading: loading.effects['reports/add'],
}))(Form.create()(index));
