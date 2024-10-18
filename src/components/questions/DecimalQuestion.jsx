// src/components/questions/DecimalQuestion.jsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";

const DecimalQuestion = ({ question }) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth margin="normal">
      <Controller
        name={`responses.${question.id}`}
        control={control}
        rules={{
          required: question.required,
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Enter a valid number",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={question.questionText}
            required={question.required}
            error={!!error}
            helperText={
              error
                ? error.type === "pattern"
                  ? "Invalid number format"
                  : "This field is required"
                : ""
            }
            type="number"
            inputProps={{
              step: "0.01",
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default DecimalQuestion;
