import React, { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

function Form() {
  const [course, setCourse] = useState(0);
  const [subject, setsubject] = useState([]);
  const [date, setDate] = useState("");
  const [selectSubject, setSelectSubject] = useState("");
  const [textNode, setTextNode] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const allCourse = [
    "Registration Form",
    "English Literature",
    "Computer Sciences"
  ];

  const selectCourse = param => {
    setCourse(param);
    renderSubject(param);
  };

  const renderSubject = param => {
    const obj = {
      1: ["Short Reports", "Annual Reports", "Presentations"],
      2: ["Poetry", "Short Stories", "Drama"],
      3: [
        "Web Development",
        "Desktop Software Development",
        "Research and Analysis"
      ]
    };
    if (param) setsubject(obj[param]);
  };

  const checkValidation = () => {
    let err = "";

    if (!err) course ? (err = "") : (err = "Please check any course.");
    if (!err) selectSubject ? (err = "") : (err = "Please select subject.");

    if (!err) {
      if (date) {
        date === "2019-12-20" || date === "2020-01-15" || date === "2020-02-01"
          ? (err = "")
          : (err =
              "Your selected course and subject is not offered beginning from your selected date.");
      } else {
        err = "Please select date";
      }
    }

    if (textNode.length) {
      if (!err)
        textNode.length >= 20 && textNode.length <= 50
          ? (err = "")
          : (err =
              "Additional Notes is not less than 20 characters and not more than 500 characters.");
    }
    return err;
  };

  const renderCourse = () => {
    return allCourse.map((val, ind) => (
      <div key={ind}>
        <label>{val}</label>
        <input
          type="radio"
          name="course"
          onClick={() => selectCourse(ind + 1)}
        />
      </div>
    ));
  };

  const renderSubjectOption = () => {
    return (
      <select onChange={e => setSelectSubject(e.currentTarget.value)}>
        {subject.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    );
  };

  const submit = () => {
    let err = checkValidation();

    setErrorMsg(err);
    if (!err) {
      setLoading(true);
      setTimeout(() => {
        swal("Registration Succesfully ");
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="card">
        <h3>Registration Form</h3>
        {!!errMsg && <p>{errMsg}</p>}

        <div className="cardDiv">
          <h5>
            Course <b>*</b>
          </h5>
          {renderCourse()}
        </div>

        {!!subject.length && (
          <div className="cardDiv">
            <h5>
              Subject <b>*</b>
            </h5>
            {renderSubjectOption()}
          </div>
        )}

        <div className="cardDiv">
          <h5>
            Start date <b>*</b>
          </h5>
          <input type="date" onChange={e => setDate(e.currentTarget.value)} />
        </div>

        <div className="cardDiv">
          <h5>Additional Notes</h5>
          <textarea
            onChange={e => setTextNode(e.currentTarget.value)}
          ></textarea>
        </div>

        <button disabled={loading} onClick={submit}>
          {loading ? <div className="loader"></div> : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default Form;
