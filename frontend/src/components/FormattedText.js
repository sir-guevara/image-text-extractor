// FormattedText.js
import React from "react";

const FormattedText = ({ text }) => {
  // Replace line breaks with <br> tags
  const formattedText = text.replace(/\n/g, "<br>");

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: formattedText,
      }}
    />
  );
};

export default FormattedText;
