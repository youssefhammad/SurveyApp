// src/components/questions/DateQuestion.jsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";

const DateQuestion = ({ question }) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth margin="normal">
      <Controller
        name={`responses.${question.id}`}
        control={control}
        rules={{ required: question.required }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={question.questionText}
            required={question.required}
            error={!!error}
            helperText={error ? "This field is required" : ""}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default DateQuestion;
