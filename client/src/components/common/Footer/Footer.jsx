import { Col, Row } from 'antd';
import styles from './Footer.module.scss'


const Footer = () => {
    return (
        <Row className={styles.footer}>
            <Col sm={8} xs={24}>AppCo</Col>
            <Col sm={8} xs={24}>All rights reserved by ThemeTags</Col>
            <Col sm={8} xs={24}>Copyrights © 2019.</Col>
        </Row>
    )
}
export default Footer;