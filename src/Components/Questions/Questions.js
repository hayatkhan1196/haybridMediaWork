import React from "react";
import styled from "styled-components";

const QuestionStyle = styled.div`
  flex: 2;
  width: 100%;
`;
const Heading = styled.h1`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 1rem;
  margin-left: 10px;
  width: 4rem;
  background-color: #6a86ee;
  border-radius: 3px;
  border: none;
`;

const SubBtton = styled.button`
  padding: 1rem;
  margin: 1rem;
  background-color: #6a86ee;
  border-radius: 3px;
  border: none;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: end;
  margin: 10;
`;
const InputDiv = styled.div`
  display: flex;
  margin-left: 5;
`;
const QuestionShow = styled.div`
  font-weight: 700;
`;
const MainDiv = styled.div`
  margin-left: 20;
`;

const Questions = ({
  handleChangeForCheckBox,
  editQuestion,
  deleteQuestion,
  questions,
  submitWorkSheet,
  isLoading,
}) => {
  return (
    <QuestionStyle>
      <Heading>Work Sheet</Heading>
      <MainDiv>
        {questions.length > 0 &&
          questions.map((item, indexOfQuestion) => {
            return (
              <>
                <QuestionShow>{item.question}</QuestionShow>
                <div>
                  {item.options.map((ele, indexofOption) => {
                    return (
                      <InputDiv>
                        <input
                          type="radio"
                          id={indexofOption}
                          value={ele.text}
                          checked={item.selectedValue === ele.text}
                          onChange={(e) =>
                            handleChangeForCheckBox(
                              e.target.value,
                              indexOfQuestion
                            )
                          }
                        />
                        <div>{ele.text}</div>
                      </InputDiv>
                    );
                  })}
                </div>
                <AddButton>
                  <Button
                    className="button add"
                    onClick={() =>
                      editQuestion(item.question, item.options, indexOfQuestion)
                    }>
                    Edit
                  </Button>
                  <Button
                    className="button add"
                    onClick={() => deleteQuestion(indexOfQuestion)}>
                    Delete
                  </Button>
                </AddButton>
              </>
            );
          })}
      </MainDiv>
      {questions.length > 0 && (
        <SubBtton className="button add" onClick={submitWorkSheet}>
          {isLoading ? "please wait..." : "submit Work Sheet"}
        </SubBtton>
      )}
    </QuestionStyle>
  );
};
export default Questions;
