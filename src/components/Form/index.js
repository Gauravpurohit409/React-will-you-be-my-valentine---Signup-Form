import React, { useState } from 'react';

const Form = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    
    const [gender, setGender] = useState("male")
    const [phoneNumber, setPhoneNumber] = useState("")

    const removeOldMessages = () =>{
        const errorMessage = document.querySelector(".errorMessage");
       
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
    const checkName = () =>{
        

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
    const checkEmail = ()=>{

        return !(email.includes("@"));
    }

    const checkGender = () =>{
        if (gender === "select")
            return true;
        return false;
    }
    const checkPhoneNumber = () =>{
        let flag = 0;
        for (const i in phoneNumber)
        {
            if (isNaN(phoneNumber[i]))
            { 
                flag = 1;
                break;
            }
        }
        
        return (flag === 1);
    }
    const checkPassword = () =>{
        console.log(password.length < 6);
        return (password.length < 6);
    }

    const reset = ()=>{
        
        setName("");
        setEmail("");
        setGender("male");
        setPassword("");
        setPhoneNumber("");
    }
    const validate = () =>{
    
    
        removeOldMessages();
        if (name.length === 0 || email.length === 0 || phoneNumber.length === 0 || password.length === 0)
        {
            attacherrorMessage("len");
        }
        else if (checkName())
        {
            attacherrorMessage("name");
            // Todo : focus the element
            
        }
        else if (checkEmail())
        {
            attacherrorMessage("email");
            // Todo : focus the element
            
        }
        else if (checkGender())
        {
            attacherrorMessage("gender");
            // gender.focus();
        }
        else if (checkPhoneNumber())
        {
            attacherrorMessage("number");
            // Todo : focus the element
        }
        else if (checkPassword())
        {
            // Todo : focus the element
            attacherrorMessage("password");
        }
        else{

            attachWelcomeMessage(email);
            reset();
        }
    }

    const change = (e) =>{
        
        switch(e.target.id)
        {
            case "Name" : setName(e.target.value);
            break;
            case "Email": setEmail(e.target.value);
            break;
            case "Gender": setGender(e.target.value);
            break;
            case "Number":setPhoneNumber(e.target.value);
            break;
            case "Password" :setPassword(e.target.value);
            break;
        }
    }
    return (
        <div>
            <form >
                <label htmlFor ="Name">Name</label>
                <input type ="text" id ="Name" data-testid = "name" placeholder = "Enter Name" onChange = {change} value={name} />
                <br/>
                <label htmlFor ="Email">Email</label>
                <input type= "email" id ="Email" data-testid = "email" placeholder="Email" value={email} onChange = {change}/>
                <br/>
                <label htmlFor="gender"  > Gender</label>
                <select id="Gender"  data-testid="gender" value = {gender} onChange = {change}>
                   <option  value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <br/>
                <label htmlFor="Number">Phone Number</label>
                   <input type="text" id="Number" data-testid ="phoneNumber" onChange = {change} value = {phoneNumber} />
                <br />
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" data-testid = "password" value ={password} onChange = {change} />
                <br/>

                
                <p onClick = {validate} data-testid = "submit" style = {{border: "2px solid black",width:"70px",background:"#0879FA",color:"white"}}>Submit</p>
            </form>
        </div>
    );
};

export default Form;