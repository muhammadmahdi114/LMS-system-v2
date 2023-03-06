import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useRouter } from "next/router";

export default function Form({
  setActive,
  setPaperId,
  examDetails,
  paperType,
}) {
  const router = useRouter();
  const [edit, setEdit] = useState(examDetails ? true : false);
  const [paperName, setPaperName] = useState(
    edit ? examDetails.paper_name : ""
  );
  const [paperDuration, setPaperDuration] = useState(
    edit ? Number(examDetails.duration) : 180
  );
  const [dateOfExam, setDateOfExam] = useState(edit ? examDetails.date : "");
  const [weightage, setWeightage] = useState(edit ? examDetails.weightage : "");
  const [paperTime, setPaperTime] = useState(
    edit ? examDetails.time : "09:00:00"
  );
  const [freeflow, setFreeflow] = useState(false);
  const [review,setReview] = useState(false)

  const handlePaperName = (e) => {
    setPaperName(e.target.value);
  };

  const handleReview =(e)=>{
    setReview(e.target.checked)
  }

  const handleDuration = (e) => {
    setPaperDuration(parseInt(e.target.value));
  };

  const handleDateOfExam = (e) => {
    setDateOfExam(e.target.value);
  };

  const handleWeightage = (e) => {
    setWeightage(parseInt(e.target.value));
  };

  const handlePaperTime = (e) => {
    setPaperTime(e.target.value);
  };

  const handleFreeflow = (e) => {
    setFreeflow(e.target.checked);
  };

  const formatDate = (examDate, examTime) => {
    const date = new Date(examDate);
    const dateString =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    const timeString = examTime;
    return dateString + "T" + timeString + "Z";
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("formatted date is", formatDate(dateOfExam, paperTime));
    if (paperName === "" || dateOfExam === "" || weightage === "") {
      alert("Please fill all the fields");
      return;
    }

    const res = await axios.post(
      `/api/faculty/paper_creation/${edit ? "edit_paper" : "new_paper"}`,
      {
        paper_id: examDetails ? examDetails.paper_id : null,
        course_code: router.query.course_code ? router.query.course_code : null,

        paper_name: paperName,
        date: formatDate(dateOfExam, paperTime),
        duration: paperDuration,
        weightage: parseInt(weightage),
        paper_type: paperType,
        freeflow: freeflow,
        review:review
      }
    );

    setPaperId(res.data.paper_id);
    setActive(2);
  };

  return (
    <form>
      <div className="w-full grid grid-cols-2 pr-10 gap-x-5 mt-10 font-poppins">
        <Input
          text={"Paper Name"}
          required={true}
          type={"text"}
          placeholder={"Ex: Mid-Term Exam"}
          onChange={handlePaperName}
          value={paperName}
        />
        <Input
          text={"Paper Duration (in minutes)"}
          required={true}
          type={"number"}
          value={paperDuration}
          min={0}
          max={180}
          onChange={handleDuration}
        />

        <Input
          text={"Date of Exam"}
          required={true}
          type={"date"}
          onChange={handleDateOfExam}
          value={dateOfExam}
        />

        <Input
          text={"Weightage"}
          required={true}
          type={"number"}
          min={0}
          placeholder={"Ex: 20%"}
          value={weightage}
          onChange={handleWeightage}
        />

        <Input
          text={"Paper Start Time"}
          required={true}
          type={"time"}
          onChange={handlePaperTime}
          value={paperTime}
        />

        <div className="flex items-center gap-x-3 mt-14 ml-2">
          <label className="block">Freeflow?</label>
          <input
            type="checkbox"
            className="accent-slate-100"
            onChange={handleFreeflow}
          />
        </div>

        <div className="flex items-center gap-x-3 mt-14 ml-2">
          <label className="block">Allow review?</label>
          <input
            type="checkbox"
            className="accent-slate-100"
            onChange={handleReview}
          />
        </div>
      </div>
      <div className="mt-10 w-full pr-10 flex justify-end gap-x-5">
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={submitForm}
        >
          Proceed
        </button>
      </div>
    </form>
  );
}
