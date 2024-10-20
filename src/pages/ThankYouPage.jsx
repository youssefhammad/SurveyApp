import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Thank You!
          </Typography>
          <Typography variant="subtitle1">
            Your responses have been submitted successfully.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ThankYouPage;
