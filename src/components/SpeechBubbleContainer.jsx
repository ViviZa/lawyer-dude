import React from "react";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";
import { ReactComponent as LDLamaSceptical } from "../images/Lawyerdude-llama-head-sceptical.svg";
import { ReactComponent as LDHeadSceptical } from "../images/Lawyerdude-head-sceptical.svg";

const SpeechBubbleContainer = props => {
  const { panels, textIndex, jail } = props;

  return (
    <div>
      <div className={jail ? "jail-speech" : "speech"}>
        <div className={jail ? "speechbubbletext-jail" : "speechbubbletext"}>
          <div dangerouslySetInnerHTML={{ __html: panels[textIndex] }} />
        </div>
      </div>
      {!jail && (
        <div className="lama-container">
          <LDLamaSceptical className="lama-sceptical" />
        </div>
      )}
      <div className="speechlawyer-container">
        {jail ? (
          <LDHeadSceptical className="speechlawyer-sceptical" />
        ) : (
          <LDHeadHappy className="speechlawyer-happy" />
        )}
      </div>
    </div>
  );
};

export default SpeechBubbleContainer;
