import { Col, Row } from 'antd';
import svgFooter from './../../images/svg/footer.svg';
import styles from './Footer.module.scss';



const Footer = () => {
   
    return (<div classname={styles.footer_container}>
        <div className={styles.email_container}>
            <input
                className={styles.email_input}
                type="text"
                placeholder="Enter your email"
            /> <span className={styles.email_send_btn}>Subscribe</span>
           
        </div>
        <img src={svgFooter} className={styles.svgFooter} alt=""/>
        <div>
            <Row className={styles.footer}>
                <Col span={8}>AppCo</Col>
                <Col span={8}>All rights reserved by ThemeTags</Col>
                <Col span={8}>Copyrights © 2019.</Col>
            </Row>
        </div>
            
    </div>)
}
export default Footer;