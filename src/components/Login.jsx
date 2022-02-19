import { Input, Button } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Login = () => {
  const { setId, updateAuthTrue } = useContext(AuthContext);

  const userInput = useRef({});
  let navigate = useNavigate();
  const handleinputChange = (e) => {
    const { name, value } = e.target;
    userInput.current = {
      ...userInput.current,
      [name]: value,
    };
  };

  const loginUser = async () => {
    let request = await fetch("http://localhost:2525/login/", {
      method: "POST",
      body: JSON.stringify(userInput.current),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await request.json();

    if (data.status === "true") {
      localStorage.setItem(
        "employeeToken",
        JSON.stringify("Bearer " + data.token)
      );
      console.log(data.user._id);
      setId(data.user._id);
      updateAuthTrue();
      navigate(`/`);
    } else {
      alert("Login failed: Password or Email is wrong");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <label>Email : </label>
      <Input
        placeholder="Email"
        style={{ width: "400px" }}
        name="email"
        onChange={handleinputChange}
      />
      <br></br>
      <br></br>
      <label>Password : </label>
      <Input.Password
        placeholder="input password"
        style={{ width: "400px" }}
        name="password"
        onChange={handleinputChange}
      />
      <br></br>
      <br></br>
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>

      <div style={{ marginTop: "20px" }}>
        <h4>Demo Employer Credentials</h4>
        <p>Email : saurabhnimkande@gmail.com</p>
        <p>Password : secret@123</p>
        <h4>Demo Employee Credentials</h4>
        <p>Email : nsnasel6@cbsnews.com</p>
        <p>Password : secret@123</p>
      </div>
    </div>
  );
};
