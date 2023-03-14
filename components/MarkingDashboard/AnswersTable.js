import React, { useState, useEffect } from "react";
import AttempContainer from "./AttempContainer";

const AnswersTable = ({ questions, answers, isStudent }) => {
  const questionWithAnswers = (questions, answers) =>
    questions.map((question) => {
      const answer = answers.find((answer) => answer?.sq_id === question.sq_id);

      return {
        ...question,
        answer: answer ? answer.answer : null,
        marksobtained: answer ? answer.marksobtained : 0,
      };
    });

  const questionsWithChild = () => {
    let subjectiveWithChild = [];
    const questionsAndAnswers = questionWithAnswers(questions, answers);
    questionsAndAnswers.forEach((question) => {
      if (question.parent_sq_id) {
        const parent = questionsAndAnswers.find(
          (q) => q.sq_id === question.parent_sq_id
        );
        let children = [];
        if (parent) {
          children = parent.children || [];
          children.push(question);
          children.sort((a, b) => a.questionnumber - b.questionnumber);
          parent.children = children;
        }
      } else {
        subjectiveWithChild.push(question);
      }
    });
    return subjectiveWithChild;
  };

  return (
    <div className="flex flex-col space-y-10">
      {questionsWithChild().map((question, index) => (
        <AttempContainer
          key={question.sq_id}
          question={question}
          isStudent={isStudent}
        />
      ))}
    </div>
  );
};

export default AnswersTable;
