import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Select, MenuItem, FormControl, InputLabel, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { formDetailsActions } from "../../Redux/Reducers/formDataSlice";
import { userDetailsFormOneValidations } from "../../Utils/Validations/Validations";

const UserDataFormOne = ({ props }) => {
  const { setFormStep } = props;

  const { control, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(userDetailsFormOneValidations),
  });

  const userDetails = useSelector((state) => state.formData);

  const dispatch = useDispatch();

  const handleSaveToFormReduxState = async (data) => {
    console.log("this is clickeddddddddddddddddddddddddddd");
    const isValid = await trigger();

    console.log(data, "this is form data", isValid);
    dispatch(formDetailsActions.storeFormData(data));
    setFormStep(1);
  };

  console.log(formState.errors, "this is the userrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

  return (
    <Container className='form-container'>
      <Box className='form-wrapper'>
        <form onSubmit={handleSubmit(handleSaveToFormReduxState)}>
          <Controller
            name='name'
            control={control}
            defaultValue={userDetails?.name || ""}
            // value={userDetails?.name}
            render={({ field, fieldState }) => (
              <>
                <TextField {...field} error={!!fieldState.error} label='Name' variant='outlined' fullWidth margin='normal' type='text' />
                {formState.touchedFields.name && formState.errors.name && <div className='error-message'>{formState.errors.name.message || ""}</div>}
              </>
            )}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                name='age'
                control={control}
                defaultValue={userDetails?.age || ""}
                render={({ field, fieldState }) => (
                  <>
                    <TextField {...field} error={!!fieldState.error} label='Age' variant='outlined' fullWidth margin='normal' type='number' />
                    {formState.touchedFields.age && formState.errors.age && <div className='error-message'>{formState.errors.age.message || ""}</div>}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='sex'
                control={control}
                defaultValue={userDetails?.sex || ""}
                render={({ field, fieldState }) => (
                  <>
                    <FormControl fullWidth margin='normal' error={!!fieldState.error}>
                      <InputLabel id='sex-label'>Sex</InputLabel>
                      <Select labelId='sex-label' label='Sex' {...field}>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                      </Select>
                    </FormControl>
                    {formState.touchedFields.sex && formState.errors.sex && <div className='error-message'>{formState.errors.sex.message || ""}</div>}
                  </>
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name='mobile'
            control={control}
            defaultValue={userDetails?.mobile || ""}
            render={({ field, fieldState }) => (
              <>
                {" "}
                <TextField {...field} error={!!fieldState.error} label='Mobile' variant='outlined' fullWidth margin='normal' type='tel' />
                {formState.touchedFields.mobile && formState.errors.mobile && (
                  <div className='error-message'>{formState.errors.mobile.message || ""}</div>
                )}
              </>
            )}
          />
          <Controller
            name='idType'
            control={control}
            defaultValue={userDetails?.idType || ""}
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth margin='normal' error={!!fieldState.error}>
                  <InputLabel id='id-type-label'>Government ID Type</InputLabel>
                  <Select labelId='id-type-label' label='Government ID Type' {...field}>
                    <MenuItem value='PAN'>PAN Card</MenuItem>
                    <MenuItem value='AADHAR'>Aadhar Card</MenuItem>
                  </Select>
                </FormControl>

                {formState.touchedFields.idType && formState.errors.idType && (
                  <div className='error-message'>{formState.errors.idType.message || ""}</div>
                )}
              </>
            )}
          />
          <Controller
            name='governmentId'
            control={control}
            defaultValue={userDetails?.governmentId || ""}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  // helperText={fieldState.error?.message}
                  label='Government ID'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  type='text'
                />
                {formState.touchedFields.governmentId && formState.errors.governmentId && (
                  <div className='error-message'>{formState.errors.governmentId.message || ""}</div>
                )}
              </>
            )}
          />
          <Button type='submit' variant='contained' color='primary' className='button-next'>
            Next
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserDataFormOne;
