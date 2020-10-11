/*
    title: 用户
*/
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';


import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import UserModal from './components/UserModal';

const index = ({ list }) => {
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
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            )
        }
    ];
    return (
        <Content>
            <Tool>
                <Button type="primary">添加用户</Button>
                <UserModal></UserModal>
            </Tool>
            <Table columns={columns} dataSource={list} rowKey={(list, index) => list.id} />
        </Content>
    );
};

export default connect(({ users }) => ({ ...users }))(index);
