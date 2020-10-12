import React from 'react';
import { Menu, Dropdown, Icon, Affix } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

const MenuItem = Menu.Item;

function index({ location }) {
    const menu = (
        <Menu>
            <MenuItem>
                <span>退出</span>
            </MenuItem>
        </Menu>
    );
    return (
        <Affix offsetTop={0}>
            <div className="header">
                <img className="logo" src={require('@/assets/logo.png')} alt="logo" />
                <Menu className="menus" mode="horizontal" theme="dark" selectedKeys={[location.pathname]}>
                    <MenuItem key="/">
                        <Link to="/">首页</Link>
                    </MenuItem>
                    <MenuItem key="/users">
                        <Link to="/users">用户</Link>
                    </MenuItem>
                    <MenuItem key="/reports">
                        <Link to="/reports">周报</Link>
                    </MenuItem>
                </Menu>
                <div className="right">
                    <Dropdown overlay={menu}>
                        <a href="/">
                            <Icon type="user" style={{ marginRight: 3 }} />
                        admin
                    </a>
                    </Dropdown>
                </div>
            </div>
        </Affix>
    );
}

export default withRouter(index);
