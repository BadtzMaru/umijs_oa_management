import React from 'react';
import { Menu, Dropdown, Icon, Affix } from 'antd';
import { Link, router, withRouter } from 'umi';

const MenuItem = Menu.Item;

function index({ location }) {
    const onLogout = () => {
        localStorage.clear();
        router.push('/login');
    };
    const menu = (
        <Menu>
            <MenuItem>
                <span onClick={onLogout}>退出</span>
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
                            {localStorage.nickname}
                        </a>
                    </Dropdown>
                </div>
            </div>
        </Affix>
    );
}

export default withRouter(index);
