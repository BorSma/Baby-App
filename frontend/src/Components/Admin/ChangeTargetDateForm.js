import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BabyAppContext } from "../../Context/BabyAppContext";
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
  for (var i = currentyear; i <= currentyear + 5; i++) {
    years[j] = i;
    j++;
  }

  const [inputDay, setinputDay] = useState(days[0]);
  const [inputMonth, setinputMonth] = useState(`${months[0]}`);
  const [inputYear, setinputYear] = useState(years[0]);

  const submitForm = (event) => {
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
      <h3>The current target date is set to: {targetDate}</h3>
      <StyledForm onChange={onChange} onSubmit={submitForm}>
        <ContentWrapper>
          <LabelWrapper></LabelWrapper>
          <InputWrapper>
          <p>Select a new birthday:</p>
            <select name="day" id="day" onChange={onChangeDay}>
              <option value="DEFAULT">Select one...</option>
              {days.map((day, i) => {
                return <option value={day}>{day}</option>;
              })}
            </select>
            <select name="month" id="month" onChange={onChangeMonth}>
              <option value="DEFAULT">Select one...</option>
              {months.map((month, i) => {
                return <option value={month}>{month}</option>;
              })}
            </select>
            <select name="year" id="year" onChange={onChangeYear}>
              <option value="DEFAULT">Select one...</option>
              {years.map((year, i) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
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
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Input = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 25px;
  border-style: solid;
  outline: none;
  margin: 10px;
  padding: 2px;
`;

const Label = styled.p`
  margin: 10px;
`;

const Submit = styled.input`
  width: 100px;
  height: 30px;
  outline: none;
  margin: 20px;
`;

export default ChangeTargetDateForm;
