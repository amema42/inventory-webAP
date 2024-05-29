import React, { useContext } from "react";
import { FontContext } from "./FontContext";

const ChangeFontButton = () => {
  const { toggleFont } = useContext(FontContext);

  return <button onClick={toggleFont}>Change Font</button>;
};

export default ChangeFontButton;
