import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import MCQTable from "./McqTable";
import SubjectiveTable from "./SubjectiveTable";


const Accordion = ({questions, paperType}) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div>
            <div
                className="bg-transparent rounded-lg  p-4 mb-4 cursor-pointer"
                
            >
                <div className="flex flex-col" onClick={() => handleAccordionClick(1)}>
                    <div className="flex flex-row">
                        <h2 className="text-xl font-bold mr-4">{paperType === "Objective" ? "Objective Questions" : "Subjective Questions" }</h2>
                        <MdArrowDropDown fontSize={28} className="fill-blue-800" />
                    </div>
                    {activeIndex === 1 &&
                        paperType === "Objective" ?
                        (<MCQTable objective_questions={questions} />)
                        : activeIndex === 1 && paperType === "Subjective/Objective" &&
                        (<SubjectiveTable subjective_questions={questions} />)}
                </div>
            </div>
        </div>
    );
};

export default Accordion;