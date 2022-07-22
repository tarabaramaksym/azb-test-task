import { useEffect, useState } from "react"
import { connect } from 'react-redux';
import UserCard from "./UserCard/UserCard";
import '../../Styles/UserCards/UserCards.css';
import { getUsers } from "../../Redux/actions";


const UserCards = props => {

  const renderUsers = () => {
    return props.users.map((user, index) => (
      <UserCard key={index} user={user} />
    ))
  }

  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    await props.getUsers(offset);
    setOffset(offset + 6);
  }

  useEffect(() => {
    fetchData();
  }, []);


  if (props.users.length === 0) {
    return null;
  }
  return (
    <div id="users">
      <h2 className="title center h-center-container margin-title">Working with GET request</h2>
      <div className="user-cards">
        {renderUsers()}
      </div>
      <div className="v-h-center-container">
        {props.totalUsers <= props.offset + 6 ? null : <button className="btn btn-primary" onClick={fetchData} >Show more</button>}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => (
  {
    users: state.users,
    totalUsers: state.totalUsers
  }
);

const mapDispatchToProps = {
  getUsers: getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCards);