import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";

const Button = styled.button`
  padding: 1rem;
  background-color: #6a86ee;
  border-radius: 3px;
  border: none;
  margin-left: 60%;
  margin-top: 10px;
`;

const Div = styled.div`
  display: flex;
`;

const QuestionDiv = styled.div`
  display: flex;
  font-weight: 700;
`;
const Input = styled.input`
  display: flex;
  justify-content: space-around;
`;
const ViewButton = styled.div`
  margin-left: 20px;
`;

const WorkSheet = () => {
  const [workSheets, setWorkSheets] = useState([]);
  const [selectedWorkSheet, setSelectedWorkSheet] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const handelFetch = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "workSheets"));
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setWorkSheets(list);
    setIsLoading(false);
  };

  useEffect(() => {
    handelFetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {!selectedWorkSheet ? (
            workSheets.map((item, index) => {
              return (
                <ViewButton>
                  {`Work Sheet No ${index + 1}`}
                  <Button onClick={() => setSelectedWorkSheet(item)}>
                    View
                  </Button>
                </ViewButton>
              );
            })
          ) : (
            <div style={{ margin: 50 }}>
              <Button onClick={() => setSelectedWorkSheet("")}>Back</Button>
              {selectedWorkSheet?.questions?.map((item) => {
                return (
                  <>
                    <QuestionDiv>{item.question}</QuestionDiv>
                    <div>
                      {item.options.map((ele, indexofOption) => {
                        return (
                          <Div>
                            <Input
                              type="radio"
                              id={indexofOption}
                              value={"ele.text"}
                              checked={item.selectedValue === ele.text}
                            />
                            <Div>{ele.text}</Div>
                          </Div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default WorkSheet;
