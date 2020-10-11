import styles from './index.scss';

// 内容容器
export const Content = ({ className, ...rest }) => (
    <div className={`${styles['content-wrapper']} ${className}`} {...rest}></div>
);


export const Tool = ({ className, ...rest }) => (
    <div className={`${styles['tool-wrapper']} ${className}`} {...rest}></div>
);
