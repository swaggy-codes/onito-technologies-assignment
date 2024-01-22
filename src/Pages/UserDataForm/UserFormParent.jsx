import React, { useState } from "react";
import UserDataFormOne from "./UserDataFormOne";
import UserDataFormTwo from "./UserDataFormTwo";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const UserFormParent = () => {
  const [formStep, setFormStep] = useState(0);

  const formProps = { formStep, setFormStep };

  return (
    <>
      {formStep === 0 && <UserDataFormOne props={formProps} />}
      {formStep === 1 && <UserDataFormTwo props={formProps} />}
    </>
  );
};

export default UserFormParent;
