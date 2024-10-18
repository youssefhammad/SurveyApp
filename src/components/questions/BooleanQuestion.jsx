// src/components/questions/BooleanQuestion.jsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControlLabel,
  Switch,
  FormLabel,
  FormControl,
} from "@mui/material";

const BooleanQuestion = ({ question }) => {
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
          <FormControlLabel
            control={<Switch {...field} checked={field.value || false} />}
            label={field.value ? "Yes" : "No"}
          />
        )}
      />
    </FormControl>
  );
};

export default BooleanQuestion;
