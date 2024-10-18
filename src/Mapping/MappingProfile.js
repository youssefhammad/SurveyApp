// src/Mapping/MappingProfile.js
import { Profile } from "auto-mapper-ts";
import * as yup from "yup";

const MappingProfile = new Profile();

// Existing mappings...

export const mappingProfile = new Profile();
mappingProfile
  .createMap("Survey", "ReadSurveyDTO")
  .forMember("questions", (opts) =>
    opts.mapWith("Question", "ReadQuestionDTO")
  );

mappingProfile.createMap("CreateSurveyDTO", "Survey");
mappingProfile.createMap("UpdateSurveyDTO", "Survey");

mappingProfile
  .createMap("Question", "ReadQuestionDTO")
  .forMember("questionTypeName", (opts) =>
    opts.mapFrom("QuestionType.TypeName")
  )
  .forMember("options", (opts) => opts.mapWith("Option", "ReadOptionDTO"));

mappingProfile.createMap("CreateQuestionDTO", "Question");
mappingProfile.createMap("UpdateQuestionDTO", "Question");

mappingProfile.createMap("Option", "ReadOptionDTO");

mappingProfile.createMap("CreateOptionDTO", "Option");
mappingProfile.createMap("UpdateOptionDTO", "Option");

mappingProfile.createMap("QuestionType", "ReadQuestionTypeDTO");
mappingProfile.createMap("CreateQuestionTypeDTO", "QuestionType");
mappingProfile.createMap("UpdateQuestionTypeDTO", "QuestionType");

mappingProfile
  .createMap("Respondent", "ReadRespondentDTO")
  .forMember("surveyTitle", (opts) => opts.mapFrom("Survey.Title"))
  .forMember("responses", (opts) =>
    opts.mapWith("Response", "ReadResponseDTO")
  );

mappingProfile.createMap("CreateRespondentDTO", "Respondent");

mappingProfile
  .createMap("Response", "ReadResponseDTO")
  .forMember("questionText", (opts) => opts.mapFrom("Question.QuestionText"))
  .forMember("optionText", (opts) => opts.mapFrom("Option.OptionText"));

mappingProfile.createMap("CreateResponseDTO", "Response");

export default MappingProfile;
