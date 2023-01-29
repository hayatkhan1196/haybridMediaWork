import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Questions from "../Questions/Questions";
import styled from "styled-components";

const FormStyle = styled.form`
  flex: 2;
  margin-top: 60px;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const QuestionBox = styled.div`
  border: 2px solid green;
  //   height: 25rem;
  //   width: 40rem;
  flex: no-wrap;
  border-style: dotted;
  margin: 80px;
  flex: 1;
`;
const Input = styled.input`
  flex: 2;
  padding: 1rem;
  border-radius: 3px;
  width: 65%;
`;

const Label = styled.label`
  font-size: 30px;
  flex: 1;
  width: 15%;
  margin-left: 5%;
`;

const Button = styled.button`
  padding: 1rem;
  margin-left: 1%;
  width: 48%;
  flex: 1;
  background-color: #6a86ee;
  border-radius: 3px;
  border: none;
`;

const ButtonRemove = styled.button`
  padding: 1rem;
  margin-left: 1%;
  width: 48%;
  background-color: #f5122d;
  border-radius: 3px;
  border: none;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  float: right;
  background-color: #6a86ee;
  border-radius: 3px;
  border: none;
`;

const LabelInput = styled.div`
  display: flex;
  width: 76%;
  justify-content: space-around;
  margin-bottom: 25px;
`;

const OptionDiv = styled.div`
 display: flex;
 width: 100%,          
justify-content: space-around;       
margin-bottom: 10px;
`;
const AddOption = styled.div`
  width: 25%;
`;
const Home = () => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([""]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [isLoading, setIsLoding] = useState();

  let handleChange = (i, e) => {
    let newFormValues = [...options];
    newFormValues[i] = { text: e.target.value, isChecked: false };
    setOptions(newFormValues);
  };
  let addFormFields = () => {
    setOptions([...options, { text: "", isChecked: false }]);
  };
  let removeFormFields = (i) => {
    let newFormValues = [...options];
    newFormValues.splice(i, 1);
    setOptions(newFormValues);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    let questionObject = { question, options, selectedValue: "" };
    if (isEditMode) {
      let temp = [...Questions];
      temp[editIndex] = questionObject;
      setQuestions(temp);
    } else {
      setQuestions([...questions, questionObject]);
      setQuestion("");
      setOptions([""]);
    }
  };
  let handleChangeForCheckBox = (value, indexOfQuestion) => {
    let temp = [...questions];
    temp[indexOfQuestion].selectedValue = value;
    setQuestions(temp);
  };
  let deleteQuestion = (indexOfQuestion) => {
    let temp = [...questions];
    temp.splice(indexOfQuestion, 1);
    setQuestions(temp);
  };

  let editQuestion = (question, options, indexOfQuestion) => {
    setQuestion(question);
    setOptions(options);
    setIsEditMode(true);
    setEditIndex(indexOfQuestion);
  };

  async function submitWorkSheet() {
    setIsLoding(true);
    await addDoc(collection(db, "workSheets"), { questions });
    setIsLoding(false);
  }

  return (
    <Main>
      <FormStyle onSubmit={handleSubmit}>
        <LabelInput>
          <Label>Question</Label>
          <Input
            type="text"
            className="text-field"
            value={question}
            name="question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </LabelInput>

        {options.map((element, index) => (
          <OptionDiv>
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "80%",
              }}>
              <Label>option</Label>
              <Input
                type="text"
                className="text-field"
                value={element.text}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <AddOption>
              {index === options.length - 1 && (
                <Button
                  className="button add"
                  type="button"
                  onClick={() => addFormFields()}>
                  Add Option
                </Button>
              )}

              {index ? (
                <ButtonRemove
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(index)}>
                  Remove
                </ButtonRemove>
              ) : null}
            </AddOption>
          </OptionDiv>
        ))}
        <SubmitButton className="button submit" type="submit">
          Submit Question
        </SubmitButton>
      </FormStyle>
      {
        <QuestionBox>
          <Questions
            handleChangeForCheckBox={handleChangeForCheckBox}
            editQuestion={editQuestion}
            deleteQuestion={deleteQuestion}
            questions={questions}
            submitWorkSheet={submitWorkSheet}
            isLoading={isLoading}
          />
        </QuestionBox>
      }
    </Main>
  );
};
export default Home;
