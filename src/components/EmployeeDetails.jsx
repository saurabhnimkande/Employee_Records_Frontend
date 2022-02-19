import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const EmployeeDetails = () => {
  const { idUser } = useContext(AuthContext);
  console.log("idUser:", idUser);
  let { id } = useParams();
  const [data, setData] = useState({});

  let val = id || idUser;
  console.log("val:", val);

  const getData = async () => {
    let request = await fetch(`http://localhost:2525/${val}`);
    let data = await request.json();
    setData(data.users);
    console.log(data);
  };

  useEffect(() => {
    if (val !== "") {
      getData();
    }
  }, []);

  if (val !== "") {
    return (
      <div>
        <div id="details">
          <h1>Employee Edit Details</h1>
          <p>
            <img
              src="http://dummyimage.com/101x100.png/dddddd/000000"
              alt="profileimg"
            ></img>
          </p>
          <p>Name : {data.name}</p>
          <p>Email : {data.email}</p>
          <p>Department : {data.department}</p>
          <p>Gender : {data.gender}</p>
          <p>Joining Date : {data.joining_date}</p>
          <p>Salary : {Number(data.salary).toLocaleString() + " .Rs"}</p>
          <div>
            <h4>Salary History</h4>
            {data?.payment_history?.map((e) => {
              return (
                <div>
                  {"Month : " +
                    e.month +
                    " Year : " +
                    e.year +
                    " Salary : " +
                    Number(e.salary).toLocaleString() +
                    " .Rs"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Login to Get Profile</h1>
      </div>
    );
  }
};
