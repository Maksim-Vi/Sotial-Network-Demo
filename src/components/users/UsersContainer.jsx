import React from 'react';
import { connect } from 'react-redux';
import {
  follow,
  unfollow, 
  setCurrentPage,
  toggleIsFollowingProgres,
  requastUsers
} from '../../redux/reducer/users-reducer';
import Users from './Users';
import Preloader from './../common/preloader/preloader';
import { compose } from 'redux';
import {getUsers, getPageSize, getTotalUserCount, getCurrentPage, getIsFetching, getFollowingIsProgresing} from './../../redux/selectors/userSelectors'



class UsersContainer extends React.Component {
  // запрос на сервер по поьзователям, будет отписовываться тогда когда закроется вкладка Users
  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (currentPage) => {
    const {pageSize} = this.props
    this.props.getUsers(currentPage, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUserCount={this.props.totalUserCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingIsProgresing={this.props.followingIsProgresing}
          
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state), //  проброс из стейта отдаем в Users пользователей
    pageSize: getPageSize(state), // проброс из стейта взяли с редюсера количество страниц
    totalUserCount: getTotalUserCount(state), // проброс из стейта сколько в базе данных пользовалелей
    currentPage: getCurrentPage(state), // проброс из стейта текущая страница
    isFetching: getIsFetching(state), // проброс из стейта загрузчик
    followingIsProgresing: getFollowingIsProgresing(state)
  };
};

export default compose(
  connect(mapStateToProps, {follow,unfollow,setCurrentPage,toggleIsFollowingProgres,getUsers: requastUsers})
)(UsersContainer)