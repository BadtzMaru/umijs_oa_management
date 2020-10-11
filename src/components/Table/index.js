import { Table } from 'antd';

import './index.scss';
const index = ({ className, ...rest }) => (
    <Table className={`table-wrapper ${className}`} {...rest} />
);

export default index;