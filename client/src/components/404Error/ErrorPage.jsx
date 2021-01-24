import Header from '../common/Header/Header';
import styles from './ErrorPage.module.scss'
import React from 'react';

const Error404 = () => {
    return (
        <div className={styles.content}>
            <Header />
            <div className={styles.error_message}>
                404 Page not found
            </div>
        </div>
    )
}


export default Error404;