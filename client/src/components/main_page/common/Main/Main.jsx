import { Col, Row } from 'antd';
import React from 'react';
import styles from './Main.module.scss';
import CleanDesign from './../../images/svg/cleanDesign.svg';
import SecureData from './../../images/svg/secureData.svg';
import RetinaReady from './../../images/svg/retinaReady.svg';



const Main = () => {
    return(<div className={styles.container}>
        <div className={styles.title}>
        Why <b className={styles.bold}>small business owners</b>
        <div> <b className={styles.bold}>love</b> AppCo? </div>
        </div>
        <div className={styles.description}>
            Our design projects are fresh and simple and will benefit your business 
            <div>
            greatly. Learn more about our work!
            </div>
        </div>
        <div className={styles.grid_content}>
            <Row className={styles.grid}  gutter={[8, 32]}>
                <Col className={styles.colomn} 
                xl={{span:7, offset: 1}}
                lg={{span:7, offset: 1}} 
                md={{span:24}}   
                sm={{span:24}}
                xs={{span:24}}   >
                    <img src={CleanDesign} alt="Clean Design"/>
                    <div className={styles.description_griditem}>
                        <b>
                            Clean Design
                        </b>
                        <div className={styles.description_gridtext}>
                            <div>
                                Increase sales by showing true 
                            </div>
                            <div>
                                dynamics of your website.
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className={styles.colomn} xl={{span:7, offset: 1}}
                lg={{span:7, offset: 1}}
                md={{span:24}}
                sm={{span:24}} 
                xs={{span:24}}  >
                <img src={SecureData} alt="Secure Data"/>
                    <div className={styles.description_griditem}>
                        <b>
                            Secure Data
                        </b>
                        <div className={styles.description_gridtext}>
                            <div>
                                Build your online store’s trust using 
                            </div>
                            <div>
                                Social Proof &amp; Urgency.
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className={styles.colomn} xl={{span:7, offset: 1}} 
                lg={{span:7, offset: 1}}
                md={{span:24}}
                sm={{span:24}} 
                xs={{span:24}}  >
                <img src={RetinaReady} alt="Retina Ready"/>
                    <div className={styles.description_griditem}>
                        <b>
                            Retina Ready
                        </b>
                        <div className={styles.description_gridtext}>
                            <div>
                                Realize importance of social proof in 
                            </div>
                            <div>
                                customer’s purchase decision.
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>);
}

export default Main;