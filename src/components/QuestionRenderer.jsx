// src/components/QuestionRenderer.jsx
import React from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import DecimalQuestion from "./questions/DecimalQuestion";
import BooleanQuestion from "./questions/BooleanQuestion";
import DateQuestion from "./questions/DateQuestion";

const QuestionRenderer = ({ question }) => {
  switch (question.questionTypeName) {
    case "Multiple Choice":
      return <MultipleChoiceQuestion question={question} />;
    case "Text":
      return <TextQuestion question={question} />;
    case "Decimal Number":
      return <DecimalQuestion question={question} />;
    case "Boolean":
      return <BooleanQuestion question={question} />;
    case "Date":
      return <DateQuestion question={question} />;
    default:
      return null;
  }
};

export default QuestionRenderer;
