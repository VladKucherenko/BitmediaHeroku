import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import MainPage from './components/main_page/Main_page';
import UsersList from './components/users_list/Users_List';
import UserStatistic from './components/user_statistic/User_Statistic';
import Error404 from './components/404Error/ErrorPage'

const App = () => {

  // useEffect(() => {
  //   window.addEventListener("unhandledrejection", function (event) {
  //     alert("Внимание: Необработанная ошибка Promise. \nПричина: "
  //                 + event.reason + event.message);
  //   });
    
  //   return  window.removeEventListener("unhandledrejection", function (event) {
  //     alert("Внимание: Необработанная ошибка Promise. \nПричина: "
  //                 + event.reason + event.message);
  //   });
  // }, [window.event])
  

  return (
    <div>
      <Switch>
        <Route exact path='/' render={() => <MainPage />} />
        <Route path='/users-list' render={() => <UsersList />} />
        <Route path='/user/:id' render={() => <UserStatistic />} />
        <Route render={() => <Error404 />}/>
      </Switch>
    </div>
  );
}

export default App;


