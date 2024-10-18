// src/pages/SurveyPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import QuestionRenderer from "../components/QuestionRenderer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchSurvey, submitResponse } from "../api/surveyApi";

const SurveyPage = ({ surveyId }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const data = await fetchSurvey(surveyId);
        setSurvey(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching survey:", err);
        setError("Failed to load survey. Please try again later.");
        setLoading(false);
      }
    };

    getSurvey();
  }, [surveyId]);

  const totalSteps = survey ? survey.questions.length : 0;

  const methods = useForm({
    defaultValues: {
      responses: {},
      surveyId: survey ? survey.id : null,
      metadata: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, reset, formState, setValue } = methods;

  useEffect(() => {
    if (survey) {
      const metadata = {
        ip: "192.168.1.1",
        browser: navigator.userAgent,
      };
      setValue("metadata", JSON.stringify(metadata));
    }
  }, [survey, setValue]);

  const onSubmit = async (data) => {
    try {
      await submitResponse(data);
      setSubmitSuccess("Survey submitted successfully!");
      setSubmitError(null);
      reset({
        responses: {},
        surveyId: survey.id,
        metadata: "",
      });
      setActiveStep(0);
      navigate("/thank-you");
    } catch (err) {
      console.error("Error submitting survey:", err);
      setSubmitError("Failed to submit survey. Please try again.");
      setSubmitSuccess(null);
    }
  };

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !survey) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !survey) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <Alert severity="error">
          Failed to load survey. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" gutterBottom>
          {survey.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {survey.description}
        </Typography>

        {/* Progress Indicator */}
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / totalSteps) * 100}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Step {activeStep + 1} of {totalSteps}
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
          {survey.questions.map((question, index) => (
            <Step key={question.id}>
              <StepLabel>{`Q${index + 1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            {/* Display only the current question */}
            <QuestionRenderer question={survey.questions[activeStep]} />

            {/* Navigation Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              {activeStep < totalSteps - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!formState.isValid}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={!formState.isValid || formState.isSubmitting}
                >
                  {formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </Box>
          </Box>
        </FormProvider>

        {/* Success and Error Alerts */}
        {submitSuccess && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {submitSuccess}
          </Alert>
        )}
        {submitError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {submitError}
          </Alert>
        )}
      </motion.div>
    </Container>
  );
};

export default SurveyPage;
