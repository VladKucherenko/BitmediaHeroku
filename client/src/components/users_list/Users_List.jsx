import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { actions, getUsersThunk } from '../../redux/users_list-reducer';
import { getCurrentPage, getPortionCount, getTotalUsersCount, getUsersList } from '../../redux/users_list-selector';
import Pagination from './pagination/Pagination';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import styles from './Users_list.module.scss';
const queryString = require('query-string');

const UsersList = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const portionCount = useSelector(getPortionCount)
    const currentPage = useSelector(getCurrentPage)
    const history = useHistory();
    const dispatch = useDispatch()
    const usersList = useSelector(getUsersList)
    
    const getNewPortionOfUsers = (pageNumber) => {
        dispatch(actions.changeCurrentPage(pageNumber));
        dispatch(getUsersThunk(pageNumber, portionCount))
    }
    const usersListArray = usersList.map( user => {
        return <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><NavLink to={`/user/${user.id}`}>{user.first_name}</NavLink></td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.ip_address}</td>
                    <td>{user.totalClicks}</td> 
                    <td>{user.totalPageViews}</td>
            </tr>
    })

    useEffect( () => {
        const parsed = queryString.parse(history.location.search)
        let newPage = Number(parsed.page ? parsed.page : currentPage)
        dispatch(actions.changeCurrentPage(newPage));
        dispatch(actions.changePortionCount(Number(parsed.count ? parsed.count : portionCount)));
    }, [])

    useEffect(() => {
        if(currentPage !== null){
            const parsedForUrl = {};
        if(!!currentPage) parsedForUrl.page = currentPage
        if(!!portionCount) parsedForUrl.count = portionCount        
        dispatch(getUsersThunk(Number(parsedForUrl.page), Number(parsedForUrl.count)))
        history.push({
            pathname: '/users-list',
            search: queryString.stringify(parsedForUrl)
        })
        }
        
    },[currentPage, portionCount])
    
    return(
        <div>
            <Header />
            <div className={styles.breadcrams}>
                <NavLink to='/' >
                    Main Page
                </NavLink>
                &nbsp; &gt; &nbsp;
                User statistics
            </div>
            <div className={styles.title}>
                User statistics
            </div>
            <div className={styles.table_container}>
            <table className={styles.usersTable}>
            <thead>
                    <th>Id</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IP Adress</th>
                    <th>Total clicks</th>   
                    <th>Total page views</th>
              
            </thead>
            <tbody>        
                {usersListArray}
            </tbody>
            </table>

            <div className={styles.pagination}>
                <Pagination getNewPortionOfUsers={getNewPortionOfUsers}
                totalUsersCount={totalUsersCount}
                portionCount={portionCount}
                currentPage={currentPage}/>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default UsersList;