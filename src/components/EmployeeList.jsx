import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { Select } from "antd";
import { Pagination } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const { Option } = Select;

export const EmployeeList = () => {
  const { auth } = useContext(AuthContext);

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page") || 1;
  const [list, setList] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [department, setDepartment] = useState("");

  const [searchText, setSearchText] = useState("");
  const getData = async () => {
    let token = JSON.parse(localStorage.getItem("employeeToken"));
    let request = await fetch(
      `http://localhost:2525?page=${page}&department=${department}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    let data = await request.json();
    console.log("data:", data);
    if (data.status) {
      setTotalItems(data.total);
      setList(data.users);
    }
    if (data.status === "false") {
      alert("Validation Failed ");
    }
  };

  const getAlpha = async (query) => {
    if (query.length > 0) {
      let request = await fetch(`http://localhost:2525/search/${query}`);
      let data = await request.json();
      setTotalItems(data.total);
      setList(data.users);
    } else {
      getData();
    }
  };

  function handleChange(value) {
    setDepartment(value);
    navigate(`/employees?page=${page}&department=${value}`);
  }

  useEffect(() => {
    let start = setTimeout(() => {
      getAlpha(searchText);
    }, 1000);

    return () => {
      clearTimeout(start);
    };
  }, [searchText]);

  useEffect(() => {
    getData();
  }, [page, department]);

  const handlePages = (current) => {
    navigate(`/employees?page=${current}`);
  };
  if (auth) {
    return (
      <div>
        <h1>Employees List</h1>

        <Select defaultValue="" style={{ width: 150 }} onChange={handleChange}>
          <Option value="">None</Option>
          <Option value="Engineering">Engineering</Option>
          <Option value="Training">Training</Option>
          <Option value="Marketing">Marketing</Option>
          <Option value="Sales">Sales</Option>
          <Option value="Legal">Legal</Option>
          <Option value="Business Development">Business Development</Option>
          <Option value="Human Resources">Human Resources</Option>
          <Option value="Services">Services</Option>
          <Option value="Support">Support</Option>
          <Option value="Accounting">Accounting</Option>
        </Select>

        <Input
          placeholder="Search Employees"
          style={{
            width: "400px",
            display: "block",
            margin: "auto",
            marginBottom: "20px",
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {list?.map((e) => {
          return (
            <Link key={e._id} to={`/profile/${e._id}`}>
              <div className="employeeSingle">
                <div>
                  <img
                    src="http://dummyimage.com/101x100.png/dddddd/000000"
                    alt="profileimg"
                  ></img>
                </div>
                <div>{e.name}</div>
                <div>
                  {"Salary : " + Number(e.salary).toLocaleString() + " .RS"}
                </div>
                <div>{"Department : " + e.department}</div>
                <div>{"Joining Date : " + e.joining_date}</div>
              </div>
            </Link>
          );
        })}
        <div className="paginationDiv">
          {" "}
          <Pagination
            onChange={handlePages}
            defaultCurrent={1}
            total={totalItems}
            pageSize={30}
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Login First to View Page</h1>
      </div>
    );
  }
};
