import React from "react";
import { emailValidation } from "../Helper/validation";

class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            email : "",
            fname : "",
            lname : "",
            password : ""
        }
    }
    onEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }
    onFname = (e) => {
        this.setState({
            fname : e.target.value
        });
    }
    onLname = (e) => {
        this.setState({
            lname : e.target.value
        });
    }
    onPassword = (e) => {
        this.setState({
            password : e.target.value
        });
    }
    saveData = (e) => {
        var localItems = "";
        var arr = [];
        var email = this.state.email;
        var fname = this.state.fname;
        var lname = this.state.lname;
        var password = this.state.password;

        //calling emailValidation from validation.js for validating Regular Expression format.
        if(emailValidation(email)){
            if(localStorage.getItem("SignUpApp")!==null && localStorage.getItem("SignUpApp")!=="[]"){
                localItems = localStorage.getItem("SignUpApp");
                arr = JSON.parse(localItems);
                
                //short code to check email exists or not
                var check = arr.find(checkEmailFunction);
                function checkEmailFunction(item){
                    if(item.email===email){
                        return true
                    }
                    else{
                        return false;
                    }
                }

                //Long code to do this
                // var checkEmail = false;
                // arr.filter(function(item){
                //     if(item.email === email){
                //         checkEmail = true;
                //     }
                //     else{
                //         checkEmail = false;
                //     }
                //     return checkEmail;
                // });

                if(check){
                    e.preventDefault();//Using it here, because we want it not to close only when emails exists, not everytime.
                    document.getElementById("emailTag").innerHTML = "Email address <h6 style='color:red;'>Email already exists!</h6>";
                }
                else{
                    localItems = localStorage.getItem("SignUpApp");
                    arr = JSON.parse(localItems);
                    localStorage.removeItem("SignUpApp");
                    var newUsers = {
                        "email": email.toLowerCase(),
                        "fname" : fname,
                        "lname" : lname,
                        "password" : password
                    };
                    arr.push(newUsers);
                    localStorage.setItem("SignUpApp" , JSON.stringify(arr));
                    alert("Details Saved!");
                }
            }
            else{
                var users = {
                    "email": email.toLowerCase(),
                    "fname" : fname,
                    "lname" : lname,
                    "password" : password
                };
                arr.push(users);
                localStorage.setItem("SignUpApp" , JSON.stringify(arr));
                alert("Details Saved!");
            }
        }
        else{
            e.preventDefault();
            document.getElementById("getemailField").focus();
            document.getElementById("getemailField").setAttribute("className","form-control pt-2 pb-2 is-invalid");
            document.getElementById("emailTag").innerHTML = "Email address<br/><h6 style='color:red;'>Please enter email in correct form!</h6>";
        }
    }
  render() {
    return (
        <>
            <div className="modal fade" tabIndex="-1" id="signUp">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Enter Your Details!</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit = {this.saveData}>
                    <label className="form-label" id="emailTag">Email address</label>
                    <input type="email" className="form-control pt-2 pb-2" id="getemailField" placeholder="Enter Your Email Here!" value={this.state.email} onChange={this.onEmail} required/>
                    
                    <label className="form-label pt-2">First Name</label>
                    <input type="text" className="form-control pt-2 pb-2" id="getfnameField" placeholder="Enter Your First Name Here!" value={this.state.fname} onChange={this.onFname} required/>
                    
                    <label className="form-label pt-2">Last Name</label>
                    <input type="text" className="form-control pt-2 pb-2" id="getlnameField" placeholder="Enter Your Last Name Here!" value={this.state.lname} onChange={this.onLname} required/>
                    
                    <label className="form-label pt-2">Password</label>
                    <input type="password" className="form-control pt-2 pb-2" id="getpassField" placeholder="Enter Your Password Here!" value={this.state.password} onChange={this.onPassword} required/>
                    <input type="submit" className="btn btn-dark mt-2" id="submit" value="Submit"/>
                </form>
                </div>
            </div>
            </div>
        </div>
      </>
    );
  }
}
export default SignUp;
