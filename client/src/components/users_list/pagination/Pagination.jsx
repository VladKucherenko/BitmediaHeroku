import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import right_Arrow from './right_Arrow.svg';
import left_Arrow from './left_Arrow.svg';
import disable_right_Arrow from './disable_right_Arrow.svg';
import disable_left_Arrow from './disable_left_Arrow.svg';

const Pagination = (props) => {
    
    const pageCount = Math.ceil(props.totalUsersCount / props.portionCount);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    
    let numberOfPage =  Math.floor(1 * Math.ceil(props.currentPage / 11));
    const [ currentPortion, setCurrentPortion ] = useState(numberOfPage);
    useEffect(() => {
        setCurrentPortion(numberOfPage)
    }, [numberOfPage])
    let portionNumber = Math.ceil(pageCount / 10);
    let leftBorder = ((currentPortion - 1) * 10) + 1;
    let rightBorder = 10 * currentPortion;

    return(
        <div className={cn(styles.pages)}>
                {currentPortion > 1 ? <span classname={styles.leftArrow} onClick={() => setCurrentPortion(currentPortion-1)}><img src={left_Arrow} className={styles.arrow} /></span> : <span classname={styles.left_disableArrow}><img src={disable_left_Arrow} className={styles.arrow} /></span>}
                {pages
                .filter(page => page >= leftBorder && page <= rightBorder)
                .map(page => {
                    return (
                        <span onClick={() => { props.getNewPortionOfUsers(page)}} className={cn(styles.page,{ [styles.pageSelected]: props.currentPage === page}) } key={page}>{page} </span>
                    );
                }) 
                }
                {portionNumber > currentPortion ? <span onClick={() => setCurrentPortion(currentPortion+1)}><img src={right_Arrow} className={styles.arrow} classname={styles.rightArrow} /></span> : <span classname={styles.right_disableArrow}><img className={styles.arrow} src={disable_right_Arrow} /></span> }
            </div>
    );
}

export default Pagination;