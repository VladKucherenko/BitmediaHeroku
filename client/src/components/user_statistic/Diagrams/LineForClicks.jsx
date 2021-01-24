import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getUserStatistic } from '../../../redux/user_statistic-selector';
import styles from './Diagrams.module.scss'


const LineForClicks = (props) => {
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
     
    const stateForClicks = {
        labels: userStatistic.dateArray,
        datasets: [
            {
                label: 'Clicks',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#3A80BA',
                borderColor: '#3A80BA',
                borderWidth: 4,
                data: userStatistic.clicksArray,
                pointRadius: pointRadiusArray
            }
            
        ]
    }

    return (
        <div>
            <div className={styles.title}>
                Clicks
            </div>
            <div className={styles.diagram}>
                <Line
                    data={stateForClicks}
                    options={{
                        // elements: {
                        //     line: {
                        //         tension: 0 // disables bezier curves
                        //     }
                        // },
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                            text: 'Clcks',
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

export default LineForClicks;