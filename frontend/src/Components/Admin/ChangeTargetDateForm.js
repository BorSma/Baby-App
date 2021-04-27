import { useState, useContext } from "react";
import styled from "styled-components";
import { BabyAppContext } from "../../Context/BabyAppContext";

import Loader from "react-loader-spinner";
const ChangeTargetDateForm = () => {
  const { targetDate, updateTargetDate, setTargetDateTemp } = useContext(
    BabyAppContext
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var j = 0;
  const days = [];
  for (var i = 0; i < 31; i++) days[i] = i + 1;

  const currentyear = new Date().getFullYear().valueOf();
  const years = [];
  j = 0;
  for (var k = currentyear; k <= currentyear + 5; k++) {
    years[j] = k;
    j++;
  }

  const [inputDay, setinputDay] = useState(days[0]);
  const [inputMonth, setinputMonth] = useState(`${months[0]}`);
  const [inputYear, setinputYear] = useState(years[0]);

  const submitForm = (event) => {
    event.preventDefault();
    updateTargetDate();
  };

  const onChange = (event) => {
    setTargetDateTemp(`${inputMonth}, ${inputDay} ${inputYear} `);
  };

  const onChangeDay = (event) => {
    setinputDay(event.target.value);
  };

  const onChangeMonth = (event) => {
    setinputMonth(event.target.value);
  };

  const onChangeYear = (event) => {
    setinputYear(event.target.value);
  };

  return (
    <Wrapper>
      <Header>Modify due date: </Header>
      {!targetDate ? (
        <Loader
          type="Rings"
          color="#114b5f"
          height={50}
          width={50}
          timeout={10000} //3 secs
        />
      ) : (
        <Header>Current due date: {targetDate}</Header>
      )}

      <StyledForm onChange={onChange} onSubmit={submitForm}>
        <ContentWrapper>
          <LabelWrapper></LabelWrapper>
          <InputWrapper>
            <p>Select a new due date:</p>
            <Selection name="day" id="day" onChange={onChangeDay}>
              <option value="DEFAULT">Select one...</option>
              {days.map((day, i) => {
                return (
                  <option value={day} key={i}>
                    {day}
                  </option>
                );
              })}
            </Selection>
            <Selection name="month" id="month" onChange={onChangeMonth}>
              <option value="DEFAULT">Select one...</option>
              {months.map((month, i) => {
                return (
                  <option value={month} key={i}>
                    {month}
                  </option>
                );
              })}
            </Selection>
            <Selection name="year" id="year" onChange={onChangeYear}>
              <option value="DEFAULT">Select one...</option>
              {years.map((year, i) => {
                return (
                  <option value={year} key={i}>
                    {year}
                  </option>
                );
              })}
            </Selection>
          </InputWrapper>
        </ContentWrapper>
        <Submit type="submit" value="Submit" />
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  align-items: center;
  margin: 20px;
  padding: 40px;
  margin-top: 40px;
  padding-top: 0px;
`;

const Header = styled.h2`
  margin-top: 20px;
  color: #114b5f;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #114b5f;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin: 20px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Selection = styled.select`
  margin: 10px;
  padding: 5px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  outline: none;
`;

const Submit = styled.input`
  width: 100px;
  margin: 20px;
  background-color: #114b5f; /* Green */
  color: #f3e9d2;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: #f6f4d2;
  min-width: 150px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #f3e9d2; /* Green */
    color: #114b5f;
  }
  &:disabled {
    background-color: #114b5f; /* Green */
    color: #f3e9d2;
    cursor: auto;
  }
`;

export default ChangeTargetDateForm;
