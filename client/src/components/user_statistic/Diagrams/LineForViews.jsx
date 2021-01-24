import 'antd/dist/antd.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getUserStatistic } from '../../../redux/user_statistic-selector';
import styles from './Diagrams.module.scss'

const LineForViews = (props) => {
    const userStatistic = useSelector(getUserStatistic);
    let pointRadiusArray;
    if(userStatistic.dateArray){
        pointRadiusArray = userStatistic.dateArray.map((date, index) => {
        if(index === 0 || index === userStatistic.dateArray.length-1){
            return 5
        }
        else return 0
    })
    }
    const stateForViews = {
        labels: userStatistic.dateArray,
        datasets: [
            {
                label: 'Views',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#3A80BA',
                borderColor: '#3A80BA',
                borderWidth: 4,
                data: userStatistic.viewsArray,
                pointRadius: 2,
                pointRadius: pointRadiusArray
            }
        ]
    }
    return (
        <div >
            <div className={styles.title}>
                Views
            </div>
            <div className={styles.diagram}>
                <Line
                    data={stateForViews}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                            text: 'Views',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    stepSize: 200
                                }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default LineForViews;