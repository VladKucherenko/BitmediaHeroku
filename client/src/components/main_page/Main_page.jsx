import cn from 'classnames';
import React from 'react';
import Footer from './common/Footer/Footer';
import Header from './common/Header/Header';
import Main from './common/Main/Main';
import styles from './Main_page.module.scss';

const MainPage = (props) => {

    return (
        <div className={styles.mainPageBody}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default MainPage;