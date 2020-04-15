import React from "react";
import Paginator from "../../components/common/paginator/Paginator";
import User from "./User";


let Users = ({pageSize,totalUserCount, currentPage,onPageChanged,users,...props}) => {

  return (
    <div>
      {users.map(u => (
        <User
          user={u} key={u.id}
          followingIsProgresing={props.followingIsProgresing}
          unfollow={props.unfollow} follow={props.follow}
        />
      ))}
      <Paginator
        pageSize={pageSize} totalItemCount={totalUserCount}
        currentPage={currentPage} onPageChanged={onPageChanged}
      />
    </div>
  );
};

export default Users;
