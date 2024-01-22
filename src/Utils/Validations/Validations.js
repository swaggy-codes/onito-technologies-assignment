import * as yup from "yup";

export const userDetailsFormOneValidations = yup.object({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .nullable(true)
    .required("Age is required"),
  sex: yup.string().oneOf(["Male", "Female"], "Invalid gender").required("Gender is required"),
  mobile: yup
    .string()
    .matches(/^[6789]\d{9}$/, "Invalid mobile number (Min. 10 digits)")
    .required("Mobile number is required"),
  idType: yup.string().oneOf(["AADHAR", "PAN"], "Invalid ID type").required("ID Type is required"),
  // governmentId: yup.string().when("idType", {
  //   is: "AADHAR",
  //   then: yup
  //     .string()
  //     .matches(/^\d{12}$/, "Aadhar must be 12 digits")
  //     .required("Aadhar is required"),
  //   otherwise: yup.string().when("idType", {
  //     is: "PAN",
  //     then: yup
  //       .string()
  //       .matches(/^[A-Za-z0-9]{10}$/, "PAN must be alphanumeric and 10 characters")
  //       .required("PAN is required"),
  //     otherwise: yup.string().notRequired(),
  //   }),
  // }),

  governmentId: yup
    .string()
    .test("valid-card-number", "Invalid card number", function (value) {
      const isAadhar = /^\d{12}$/.test(value);

      const isPan = /^[A-Za-z0-9]{10}$/.test(value);

      return isAadhar || isPan;
    })
    .required("Card number is required"),

  // governmentId: yup.string().required("Document is required"),
});

export const userDetailsFormTwoValidations = yup.object({
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string(),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Invalid pincode")
    .required("Pincode is required"),
});
