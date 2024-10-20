// src/components/questions/MultipleChoiceQuestion.jsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";

const MultipleChoiceQuestion = ({ question }) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">
        {question.questionText}
        {question.required && " *"}
      </FormLabel>
      <Controller
        name={`responses.${question.id}`}
        control={control}
        rules={{ required: question.required }}
        render={({ field }) => (
          <RadioGroup {...field}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={option.optionText}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default MultipleChoiceQuestion;
