import React from "react";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";
import { ReactComponent as LDLamaSceptical } from "../images/Lawyerdude-llama-sceptical.svg";
import { ReactComponent as LDLamaHappy } from "../images/Lawyerdude-llama-happy.svg";
import { ReactComponent as LDHeadSceptical } from "../images/Lawyerdude-head-sceptical.svg";

const SpeechBubbleContainer = props => {
  const { panels, textIndex, jail } = props;

  let lamasMood;
  if (textIndex === panels.length - 1) {
    lamasMood = <LDLamaHappy className="lama-happy" />;
  } else {
    lamasMood = <LDLamaSceptical className="lama-sceptical" />;
  }

  return (
    <div>
      <div className={jail ? "jail-speech" : "speech"}>
        <div className={jail ? "speechbubbletext-jail" : "speechbubbletext"}>
          <div dangerouslySetInnerHTML={{ __html: panels[textIndex] }} />
        </div>
      </div>
      {!jail && <div className="lama-container">{lamasMood}</div>}
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
