import React from "react";
import useStyles from "./styles";

interface FormProps {}

export const Form: React.FC<FormProps> = ({}) => {
  const classes = useStyles();

  return <h1>FORM</h1>;
};
