import React from 'react';

const Form = () => {

    const removeOldMessages = () =>{
        const errorMessage = document.querySelector(".errorMessage");
        // console.log(errorMessage);
        if (errorMessage !== null)
        {
            document.body.removeChild(errorMessage);
        }

        const welcomeMessage = document.querySelector(".welcomeMessage");
        console.log(welcomeMessage);
        if (welcomeMessage !== null)
        {
            document.body.removeChild(welcomeMessage);
        }

       
    }
    const attacherrorMessage = (err) =>{
        const p = document.createElement("p");

        switch(err)
        {
            case "len":   p.innerHTML  = "Error Message: All fields are mandatory";
            break;

            case "name" : p.innerHTML = "Error Message: Name is not alphanumeric";
            break;

            case "email": p.innerHTML = "Email must contain @";
            break;

            case "gender":p.innerHTML = "Error Message: Please identify as male, female or others";
            break;

            case "number":p.innerHTML = "Error Message: Phone Number must contain only numbers";
            break;

            case "password" : p.innerHTML = "Error Message: Password must contain atleast 6 letters";
            break;

        }

        p.style.color ="red";
        p.setAttribute("class","errorMessage");
        document.body.appendChild(p);
 
    }

    const attachWelcomeMessage = (email) =>{

        const index = email.indexOf("@");
        let name = email.slice(0,index);  
        const p = document.createElement("p");
        p.innerHTML = "Hello "+name;
        p.style.color = "blue";
        p.setAttribute("class","welcomeMessage");
        document.body.appendChild(p);
       
    }
    const checkName = (name) =>{
        
        for(const i in name)
        {
            let c = name[i];
            if ((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))
            {

            // console.log("in alphabet",c);
                continue;
            }
            else if ( c === " ")
            {

            // console.log("in space",c);
                continue;
            }
            else if (!isNaN(c))
            {

            // console.log("in number",c);
                continue;
            }
            else{

            // console.log("in error",c);
                return true;
            }
        }
        return false;
    }
    const checkEmail = (email)=>{
        return !(email.includes("@"));
    }

    const checkGender = (gender) =>{
        // console.log(gender);
        // console.log(gender.value,gender.value === "select");
        if (gender.value === "select")
            return true;
        return false;
    }
    const checkPhoneNumber = (number) =>{
        let flag = 0;
        [...number].forEach(element => {
          //  console.log(element,isNaN(element));
            if (isNaN(element))
            { 
                flag = 1;
            }
        });
        return (flag === 1);
    }
    const checkPassword = (password) =>{
        console.log(password.length < 6);
        return (password.length < 6);
    }

    const reset = (name,email,gender,number,password)=>{
        name.value = "";
        email.value = "";
        gender.value = "male";
        number.value = "";
        password.value = "";
       
    }
    const validate = () =>{
        const name = document.querySelector('#Name');
        const email = document.querySelector('#Email');
        const gender = document.querySelector("#Gender");
        const number = document.querySelector("#Number");
        const password = document.querySelector("#Password");

        removeOldMessages();
        if (name.value.length === 0 || email.value.length === 0 || number.value.length === 0 || password.value.length === 0)
        {
            attacherrorMessage("len");
        }
        else if (checkName(name.value))
        {
            attacherrorMessage("name");
            // Todo : focus the element
            name.focus();
        }
        else if (checkEmail(email.value))
        {
            attacherrorMessage("email");
            // Todo : focus the element
            email.focus();
        }
        else if (checkGender(gender))
        {
            attacherrorMessage("gender");
            gender.focus();
        }
        else if (checkPhoneNumber(number.value))
        {
            attacherrorMessage("number");
            // Todo : focus the element
            number.focus();
        }
        else if (checkPassword(password.value))
        {
            // Todo : focus the element
            attacherrorMessage("password");
            password.focus();
        }
        else{

            attachWelcomeMessage(email.value);
            reset(name,email,gender,number,password);
        }
    }
    return (
        <div>
            <form >
                <label htmlFor ="Name">Name</label>
                <input type ="text" id ="Name" data-testid = "name" placeholder = "Enter Name" />
                <br/>
                <label htmlFor ="Email">Email</label>
                <input type= "email" id ="Email" data-testid = "email" placeholder="Email"/>
                <br/>
                <label htmlFor="gender"  > Gender</label>
                <select id="Gender"  data-test-id="gender">
                   <option  value="select">Select</option>
                    <option value="male" selected >Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <br/>
                <label htmlFor="Number">Phone Number</label>
                <input type="text" id="Number" data-testid ="phoneNumber"  />
                <br />
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" data-testid = "password" />
                <br/>

                <p onClick = {validate} daata-testid = "submit" style = {{border: "2px solid black",width:"70px",background:"#0879FA",color:"white"}}>Submit</p>
            </form>
        </div>
    );
};

export default Form;