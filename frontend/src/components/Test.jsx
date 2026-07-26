import React, { useState } from "react";
import "../styles/Test.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cert_list = [
  "app development",
  "distro making",
  "full stack",
  "hadoop",
  "information security",
  "machine learning",
  "python",
  "r programming",
  "shell programming",
];

const workshop_list = [
  "cloud computing",
  "data science",
  "database security",
  "game development",
  "hacking",
  "system designing",
  "testing",
  "web technologies",
];

const skill = ["excellent", "medium", "poor"];

const subject_list = [
  "cloud computing",
  "Computer Architecture",
  "data engineering",
  "hacking",
  "IOT",
  "Management",
  "networks",
  "parallel computing",
  "programming",
  "Software Engineering",
];

const career_list = [
  "Business process analyst",
  "cloud computing",
  "developer",
  "security",
  "system developer",
  "testing",
];

const company_list = [
  "BPA",
  "Cloud Services",
  "Finance",
  "Product based",
  "product development",
  "SAaS services",
  "Sales and Marketing",
  "Service Based",
  "Testing and Maintenance Services",
  "Web Services",
];

const book_list = [
  "Action and Adventure",
  "Anthology",
  "Art",
  "Autobiographies",
  "Biographies",
  "Childrens",
  "Comics",
  "Cookbooks",
  "Diaries",
  "Dictionaries",
  "Drama",
  "Encyclopedias",
  "Fantasy",
  "Guide",
  "Health",
  "History",
  "Horror",
  "Journals",
  "Math",
  "Mystery",
  "Poetry",
  "Prayer books",
  "Religion-Spirituality",
  "Romance",
  "Satire",
  "Science",
  "Science fiction",
  "Self help",
  "Series",
  "Travel",
  "Trilogy",
];

const num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const hack = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const Boolean = ["Yes", "No"];
const Choice_list = ["Management", "Technical"];
const worker_list = ["hard worker", "smart worker"];

export default function Test() {
  const [formValues, setFormValues] = useState({
    logical_thinking: 0,
    hackathon_attend: 0,
    coding_skills: 0,
    public_speaking_skills: 0,
    self_learning: 0,
    extra_course: 0,
    certificate_code: 0,
    workshop_code: 0,
    read_writing_skill: "",
    memory_capability: "",
    subject_interest: 0,
    career_interest: 0,
    company_intend: 0,
    senior_elder_advise: 0,
    book_interest: 0,
    introvert_extro: 0,
    team_player: 0,
    management_technical: "",
    smart_hardworker: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      name: "logical_thinking",
      question: "Are you a logical thinking person? (Rate out of 10)",
      type: "dropdown",
      options: num_list,
    },
    {
      id: 2,
      name: "hackathon_attend",
      question: "Do you attend any Hackathons?",
      type: "dropdown",
      options: hack,
    },
    {
      id: 3,
      name: "coding_skills",
      question: "How do you rate your coding skills? (Rate out of 10)",
      type: "dropdown",
      options: num_list,
    },
    {
      id: 4,
      name: "public_speaking_skills",
      question: "How do you rate your public speaking skills/confidence? (Rate out of 10)",
      type: "dropdown",
      options: num_list,
    },
    {
      id: 5,
      name: "self_learning",
      question: "Are you a self-learning person?",
      type: "dropdown",
      options: Boolean,
    },
    {
      id: 6,
      name: "extra_course",
      question: "Do you take extra courses in uni (other than IT)?",
      type: "dropdown",
      options: Boolean,
    },
    {
      id: 7,
      name: "certificate_code",
      question: "Select a certificate you took!",
      type: "dropdown",
      options: cert_list,
    },
    {
      id: 8,
      name: "workshop_code",
      question: "Select a workshop you attended!",
      type: "dropdown",
      options: workshop_list,
    },
    {
      id: 9,
      name: "read_writing_skill",
      question: "Select your read and writing skill",
      type: "dropdown",
      options: skill,
    },
    {
      id: 10,
      name: "memory_capability",
      question: "Is your memory capability good?",
      type: "dropdown",
      options: skill,
    },
    {
      id: 11,
      name: "subject_interest",
      question: "What subject you are interested in?",
      type: "dropdown",
      options: subject_list,
    },
    {
      id: 12,
      name: "career_interest",
      question: "Which IT-Career do you have interests in?",
      type: "dropdown",
      options: career_list,
    },
    {
      id: 13,
      name: "company_intend",
      question: "Do you have any interested company that you intend to settle in?",
      type: "dropdown",
      options: company_list,
    },
    {
      id: 14,
      name: "senior_elder_advise",
      question: "Do you ever seek any advice from senior or elders?",
      type: "dropdown",
      options: Boolean,
    },
    {
      id: 15,
      name: "book_interest",
      question: "Select your interested genre of book!",
      type: "dropdown",
      options: book_list,
    },
    {
      id: 16,
      name: "introvert_extro",
      question: "Are you an Introvert?| No - extrovert",
      type: "dropdown",
      options: Boolean,
    },
    {
      id: 17,
      name: "team_player",
      question: "Ever worked in a team?",
      type: "dropdown",
      options: Boolean,
    },
    {
      id: 18,
      name: "management_technical",
      question: "Which area do you prefer: Management or Technical?",
      type: "dropdown",
      options: Choice_list,
    },
    {
      id: 19,
      name: "smart_hardworker",
      question: "Are you a Smart worker or Hard worker?",
      type: "dropdown",
      options: worker_list,
    },
    {
      id: 20,
      question: "Do you like working on projects with strict deadlines?",
      name: "deadline",
      type: "dropdown",
      options: Boolean,
    },
  ];

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (e, name) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleRadioChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  function handleClick(e) {
    e.preventDefault();

    // Check if all fields are filled
    const isFormValid = Object.values(formValues).every(value => value !== "" && value !== null && value !== undefined);
    
    if (!isFormValid) {
      setError("Please fill out all the fields.");
      return;
    }

    // Convert "Yes"/"No" to 1/0
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === "Yes"){
        formValues[key] = 1;
      }
      else if (formValues[key] === "No"){
        formValues[key] = 0;
      }
    });

    axios
      .post(`https://career-backend.dembi.xyz/test`, formValues)
      .then((res) => {
        const data1 = JSON.stringify(res.data);

        localStorage.setItem("data", data1);
        console.log("Response:", res.data); // Check response
        navigate("/result");
      })
      .catch((err) => {
        console.log("Error:", err); // Catch and log errors
      });
  }

  return (
    <>
      <form onSubmit={handleClick} id="form-diff">
        <h1 className="title2">Test</h1>
        {questions.map(({ id, question, name, type, options, min, max, step, default: defaultValue, info }) => (
          <div className="form_control" key={id}>
            <label className="question">
              {id}. {question} {info && <span>({info})</span>}
            </label>
            {type === "slider" && (
              <input
                type="range"
                value={formValues[name] || defaultValue}
                id={name}
                name={name}
                min={min}
                max={max}
                step={step}
                onChange={(e) => handleSliderChange(e, name)}
              />
            )}
            {type === "radio" && options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={formValues[name] === option}
                  onChange={() => handleRadioChange(name, option)}
                />
                {option}
              </label>
            ))}
            {type === "dropdown" && (
              <select
                name={name}
                value={formValues[name] || ""}
                id={name}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button className="test-btn" id="b1" type="submit">
          Submit
        </button>
        {error && <div style={{marginTop: "10px"}}>{error}</div>}
      </form>
    </>
  );
}
