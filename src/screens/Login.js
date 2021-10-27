import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      getemail: "",
      getpass: "",
    };
  }

  emailChange = (e) => {
    this.setState({
      getemail: e.target.value,
    });
  };

  passChange = (e) => {
    this.setState({
      getpass: e.target.value,
    });
  };

  loginData = async (e) => {
    var getemail = this.state.getemail;
    var getpass = this.state.getpass;
    var localItems = await localStorage.getItem("SignUpApp");
    var arr = JSON.parse(localItems);
    var emailRight = false;
    var passwordRight = false;

    //This code works same as below but, I am not returning any value here so, it is 
    //showing warning on console.
    // var email = arr.filter(function(item){
    //         if(item.email === getemail){
    //             emailRight = true;
    //             if(item.password === getpass){
    //                 passwordRight = true;
    //                 return item;
    //             }
    //             else{
    //                 e.preventDefault();
    //             }
    //         }
    //         else{
    //             e.preventDefault();
    //         }

    // });

    // email.map(function(item){
        //     return alert("Welcome " + item.fname + " " + item.lname);
        // });

    //In this we are returning only that value in which our condition passes!
    var check = arr.filter((item) => {
      if (item.email === getemail) {
        emailRight = true;
        if (item.password === getpass) {
          passwordRight = true;
          return item;
        }
      }
      return item.email === getemail && item.password === getpass;
    });

    //When we return the item with condition, it stores the value at check[0]
    //so that we will show output from that.
    if (check.length > 0) {
      alert("Welcome " + check[0].fname + " " + check[0].lname);
    }

    //This if/else will be same for both block of code.
    if(!emailRight){
        e.preventDefault();
        alert("Please Enter Correct Email!");
    }
    else{
        if(!passwordRight){
            e.preventDefault();
            alert("Wrong Password!");
        }
    }
  };

  render() {
    return (
      <>
        <div className="container pt-5">
          <div className="mb-3">
            <form onSubmit={this.loginData}>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailField"
                placeholder="Enter Your Email Here!"
                value={this.state.getemail}
                onChange={this.emailChange}
                required
              />
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label mt-2"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passField"
                placeholder="Enter Your Password Here!"
                value={this.state.getpass}
                onChange={this.passChange}
                required
              />
              <button type="submit" className="btn btn-dark mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
