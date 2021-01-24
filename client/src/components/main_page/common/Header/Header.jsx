import svgHeader from './../../images/svg/head.svg';
import Mobile from './../../images/svg/mobile.svg';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Header = () => {
    return (<>
        <img src={svgHeader} className={styles.svgHead} alt="" />
        <div className={styles.logo}>
            <span>AppCo</span>
        </div>
        <div className={cn(styles.container, styles.headerWrap)}>
            <div className={styles.headerMain}>
                <div className={styles.headerMain_left}>
                    <div className={styles.headerLeft_title}>
                        <b>Brainstorming</b> <span>for</span>  
                         <div> desired perfect
                        Usability</div>
                        </div>
                        
                       
                    <p className={styles.headerLeft_description}>
                        Our design projects are fresh and simple and will benefit your
                        business greatly. Learn more about our work!
                        </p>
                    <NavLink className={styles.headerLeft_btn} to='/users-list'>Views Stats</NavLink>
                </div>
                <div className={styles.headerMain_right}>
                    <img
                        className={styles.headerRight_images}
                        src={Mobile}
                        alt="mobile"
                    />
                </div>
            </div>
        </div>

    </>)
}

export default Header;