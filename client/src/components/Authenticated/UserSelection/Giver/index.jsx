import React, { useState } from "react";
import { Form, Input } from "antd";
import {db} from "../../../Firebase";
import firebase from "../../../Firebase"

const Giver = () => {
  const [state, setState] = useState({
    temporaryInputValue: "",
  });

  function handleInputChange(e) {
    // console.log(e.target.value);
    setState({ ...state, temporaryInputValue: e.target.value });
  }
  const { temporaryInputValue } = state;
  function handleClick() {
    console.log(temporaryInputValue)
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    firebase.auth().signInWithPhoneNumber(temporaryInputValue,recaptcha).then(function(e) {
      let code = prompt('Enter the verification code: ',"");
      if (code==null) return;
      console.log(e.results)
      console.log(e.target)

      e.confirm(code).then(function(results) {
        console.log(results.user,"user");
        alert("You have signed up")
      })
    })
  }



  let data = {
    username: 'testuser',
    bank_auth: false,
    phone: '1110111',
    points: '0',
    uid:'1232frewg',
  };
  
  let setDoc = db.collection('Donors').doc('testUser').set(data);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "88vh",
        }}
      >
        <Form>
          <Form.Item>
            <Input onChange={handleInputChange} value={temporaryInputValue} />
            <div id="recaptcha"></div>
            <button onClick={handleClick}>Send code</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Giver;
