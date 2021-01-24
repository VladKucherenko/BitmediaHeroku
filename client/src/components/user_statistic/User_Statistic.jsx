import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { actions, getUsersStatisticsThunk } from '../../redux/user_statistic-reducer';
import styles from './User_statistic.module.scss';
import { getToData, getFromData, getUserStatistic } from '../../redux/user_statistic-selector';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import LineForClicks from './Diagrams/LineForClicks';
import LineForViews from './Diagrams/LineForViews';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
const queryString = require('query-string');;

const UserStatistic = (props) => {
    const { id } = useParams()
    const { RangePicker } = DatePicker;
    
    const userStatistic = useSelector(getUserStatistic);
    const toData = useSelector(getToData);
    const fromData = useSelector(getFromData);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search)
        dispatch(actions.setFromTo(parsed.from, parsed.to))
        dispatch(getUsersStatisticsThunk(id, parsed.from, parsed.to))
    }, [])
    
    const dateFormat = "YYYY-MM-DD";
    const changeDate = (mode) => {
        
        dispatch(actions.setFromTo(mode[0], mode[1]))
        dispatch(getUsersStatisticsThunk(id, mode[0], mode[1]));
    }

    useEffect(() => {
        const parsedForUrl = {};
        if(!!fromData) parsedForUrl.from = fromData
        if(!!toData) parsedForUrl.to = toData
        
        history.push({
            pathname: `/user/${id}`,
            search: queryString.stringify(parsedForUrl)
        })
    },[toData, fromData])
    return (
        <div className={styles.userStatisticBody}>
            <Header />
            <div className={styles.breadcrams}>
                <NavLink to='/' >
                    Main Page
                </NavLink>
                &nbsp; &gt; &nbsp; 
                <NavLink to={`/users-list`} >
                   User statistic 
                </NavLink>
                &nbsp; &gt; &nbsp; 
                {userStatistic.fullName}
            </div>
            <div className={styles.fullName}>
                {userStatistic.fullName}
            </div>
            <div className={styles.dataPickerBox}>
                <Space className={styles.dataPicker} direction="vertical" size={12}>
                    <RangePicker bordered={false} 
                        onChange={(value, mode) => changeDate(mode)}
                        value={[moment(fromData, dateFormat), moment(toData, dateFormat)]}
                        format={"YYYY-MM-DD"}
                        disabledDate={(current) => {
                            return (
                                current < moment("2019-10-01", dateFormat) ||
                                current > moment("2019-10-31", dateFormat)
                            );
                        }} />
                </Space>
            </div>
            <div className={styles.diagrams}>
                <LineForClicks />
                <LineForViews />
            </div>
            <Footer />
        </div>
    );
}

export default UserStatistic;