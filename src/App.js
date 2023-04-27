import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // const [firstName, setfirstName] = useState('Ankit');
  // const [lastName, setlastName] = useState('Girase');
  const [user, setUser] = useState({
    firstName: "",
    LastName: "",
    contactNum: 8788095411,
  });
  const [search, setSearch] = useState("");

  const [userData, setUserData] = useState([
    {
      id: "",
      firstName: "",
      LastName: "",
      contactNumber: "",
    },
  ]);

  // console.log(userData);

  const getUserData = () => {
    try {
      axios.get("http://localhost:3030/users").then((res) => {
        setUserData(res.data);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const addUser = (data) => {
    data.preventDefault();
    getUserData();
    console.log(user);
    let flag = false;
    userData.map((prevUser) => {
      if (user == prevUser) {
        flag = true;
        return;
      }
    });

    if (flag) {
      alert("fill unique details");
      return;
    }

    axios
      .post("http://localhost:3030/users", user)
      .then((res) => {
        alert("data added succesfully");
        window.location.reload();
      })
      .catch((err) => alert(err));

    // getUserData();
  };

  const deleteUser = (_id) => {
    const confg = window.confirm("Do you want to delete this info?");
    if (confg) {
      axios
        .delete("http://localhost:3030/users/" + _id + "/")
        .then((res) => {
          alert("record deleted");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const sortByname = () => {
    const sorted = [...userData].sort((a, b) => b.firstName < a.firstName);
    setUserData(sorted);
  };

  const searchHandle = (name) => {
    // if (name === '') return userData;
    // return userData.filter
  };

  // useEffect(() => {
  //   const searchedUsers = searchHandle(search)
  //   setUserData(searchedUsers);
  // },[search])

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="App">
      <div className="dataComponent">
        <form className="form" onSubmit={addUser}>
          <div className="form-head">
            <label>Person's Name</label>

            <input
              type="text"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              required
              placeholder="First Name"
            />
            <input
              type="text"
              onChange={(e) => setUser({ ...user, LastName: e.target.value })}
              required
              placeholder="Last Name"
            />
          </div>
          <div className="contact">
            <label>Contact</label>
            <input
              type="tel"
              required
              placeholder="Contact Number"
              pattern="[0-9]{10}"
              onChange={(e) => setUser({ ...user, contactNum: e.target.value })}
            />
          </div>
          <button class="btn btn-success" type="submit" value="submit">
            Save
          </button>
        </form>
      </div>
      <div>
        <h4>User Details</h4>

        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="container mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>SN.</th>
                <th onClick={sortByname}>Name</th>
                <th>Contact</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>
                    {d.firstName} {d.LastName}
                  </td>
                  <td>{d.contactNum}</td>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={(e) => deleteUser(d.id)}
                  >
                    Delete
                  </button>
                  <br></br>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
