/*
    title: 用户
*/
import React from 'react';
import { connect } from 'dva';
import { Button, Message, Popconfirm } from 'antd';


import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import UserModal from './components/UserModal';

const index = ({ list, total, page, pageSize, dispatch, loading, addLoading }) => {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: '25%'
        },
        {
            title: '姓名',
            dataIndex: 'nickname',
            key: 'nickname',
            width: '25%'
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
            width: '25%',
            render: text => <span>{text === '0' ? '管理员' : '普通用户'}</span>
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <div>
                    <UserModal title="编辑用户" record={record} onOk={value => handleEdit(record.id, value)}>
                        <span>编辑</span>
                    </UserModal>
                    <Popconfirm title="确定删除该用户吗" onConfirm={() => handleDelete(record.id)}>
                        <span>删除</span>
                    </Popconfirm>
                </div>
            )
        }
    ];
    const reload = () => {
        dispatch({
            type: 'users/fetch',
            payload: { page: 1 },
        });
    };
    // 编辑
    const handleEdit = (id, value) => {
        return dispatch({
            type: 'users/edit',
            payload: { id, value }
        })
            .then(res => {
                if (res && res.state === 'success') {
                    Message.success(res.msg || '编辑用户成功');
                    reload();
                    return res;
                } else {
                    Message.error('编辑用户失败');
                }
            });
    };
    // 删除
    const handleDelete = id => {
        dispatch({
            type: 'users/remove',
            payload: id,
        })
            .then(res => {
                if (res && res.state === 'success') {
                    Message.success(res.msg || '删除用户成功');
                    reload();
                    return res;
                } else {
                    Message.error('删除用户失败');
                }
            });
    };
    const handleAdd = (values) => {
        return dispatch({ type: 'users/add', payload: values })
            .then(res => {
                if (res && res.state === 'success') {
                    Message.success(res.msg || '编辑用户成功');
                    reload();
                    return res;
                } else {
                    Message.error('添加用户失败');
                }
            });
    };
    // 分页
    const handleChange = pageNum => {
        if (page !== pageNum) {
            // 发起请求
            dispatch({
                type: 'users/fetch',
                payload: {
                    page: pageNum,
                }
            });
        }
    };
    return (
        <Content>
            <Tool>
                <UserModal onOk={handleAdd} addLoading={addLoading}>
                    <Button type="primary" >添加用户</Button>
                </UserModal>
            </Tool>
            <Table
                loading={loading}
                columns={columns}
                dataSource={list}
                pagination={{
                    total,
                    pageSize,
                    current: page,
                    onChange: handleChange
                }}
                rowKey={(list, index) => list.id} />
        </Content>
    );
};

export default connect(({ users, loading }) => ({
    ...users,
    loading: loading.effects['users/fetch'],
    addLoading: loading.effects['users/add'],
}))(index);
