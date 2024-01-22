import { Autocomplete, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userDataListingActions } from "../../Redux/Reducers/userDataListingSlice";
import { formDetailsActions } from "../../Redux/Reducers/formDataSlice";
import { getCountriesList } from "../../Api/EndpointCalls";
import { debounce } from "lodash";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDetailsFormTwoValidations } from "../../Utils/Validations/Validations";

const UserDataFormTwo = ({ props }) => {
  const [countries, setCountries] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const { setFormStep } = props;

  const { control, handleSubmit, setValue, formState, trigger, setError, clearErrors } = useForm({
    resolver: yupResolver(userDetailsFormTwoValidations),
  });

  const dispatch = useDispatch();
  const previousFormData = useSelector((state) => state.formData);

  const handleSaveToReduxStateUserList = (data) => {
    console.log(data, "this is handle submit...");
    // const isValid = await trigger();
    const finalData = { ...previousFormData, ...data };
    dispatch(userDataListingActions.storeUserDataList(finalData));
    dispatch(formDetailsActions.storeFormData(""));
    setFormStep(0);
  };

  const handleCountryChange = debounce(async (searchValue) => {
    console.log(searchValue, "this is countryyyyyyyyyyyys");
    try {
      const res = await getCountriesList(searchValue);

      if (res.status === 200) {
        // return res?.data?.length ? res.data.map((e) => ({ label: e.formatted_address, value: e.formatted_address })) : null;
        console.log(res, "this is response");
        setCountries(res.data);
      }
    } catch (error) {
      return null;
    }
  }, 700);

  const handleSelectCountry = (country) => {
    // clearErrors("country");
    setCountries([]);
    setSelectedValue(country.name.common);
    setValue("country", country.name.common);
  };

  console.log(formState.errors, "these are the errors...");

  // const handleCountryChange = async (searchValue) => {
  //   console.log(searchValue, "this is countryyyyyyyyyyyys");
  //   try {
  //     const res = await getCountriesList(searchValue);

  //     if (res.status === 200) {
  //       console.log(res, "this is response");
  //       setCountries(res.data);
  //       return res?.data?.length ? res.data.map((e) => ({ label: e.name.common, value: e.name.common })) : null;
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // const fetchLocationArray = useCallback(
  //   debounce((inputText, callback) => {
  //     handleCountryChange(inputText).then((options) => callback(options));
  //   }, 700),
  //   []
  // );

  return (
    <Container className='form-container'>
      <Box className='form-wrapper'>
        <form onSubmit={handleSubmit(handleSaveToReduxStateUserList)}>
          <Box className='back-icon-wrapper'>
            <ChevronLeftIcon className='back-arrow' variant='contained' color='primary' onClick={() => setFormStep(0)} />
          </Box>
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <TextField {...field} error={!!fieldState.error} label='Address' variant='outlined' fullWidth margin='normal' />
                {formState.touchedFields.address && formState.errors.address && (
                  <div className='error-message'>{formState.errors.address.message || ""}</div>
                )}
              </>
            )}
          />

          <Controller
            name='state'
            control={control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <TextField {...field} error={!!fieldState.error} label='State' variant='outlined' fullWidth margin='normal' />
                {formState.touchedFields.state && formState.errors.state && (
                  <div className='error-message'>{formState.errors.state.message || ""}</div>
                )}
              </>
            )}
          />

          <Controller
            name='city'
            control={control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <TextField {...field} error={!!fieldState.error} label='City' variant='outlined' fullWidth margin='normal' />
                {formState.touchedFields.city && formState.errors.city && <div className='error-message'>{formState.errors.city.message || ""}</div>}
              </>
            )}
          />

          {/* <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Country'
                variant='outlined'
                fullWidth
                margin='normal'
                onChange={(e) => {
                  const searchValue = e.target.value;
                  field.onChange(searchValue);
                  handleCountryChange(searchValue);
                }}
              />
            )}
          /> */}

          <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth margin='normal' variant='outlined'>
                  <TextField
                    label='Select or type to select Country'
                    value={selectedValue}
                    error={selectedValue === "" && !!fieldState.error}
                    onChange={(e) => {
                      const searchValue = e.target.value;
                      setSelectedValue(searchValue);
                      handleCountryChange(searchValue);
                      clearErrors("country");
                    }}
                    onBlur={() => {
                      setCountries([]);
                    }}
                    variant='outlined'
                    margin='normal'
                  />
                  {countries.map((country, i) => (
                    <MenuItem
                      key={country.id}
                      // value={country.name.common}
                      className='menu-item'
                      onClick={(e) => {
                        handleSelectCountry(country);
                        clearErrors("country");
                        setValue("country", country.name.common);
                        // setError("country", "");
                      }}>
                      {country.name.common}
                    </MenuItem>
                  ))}
                </FormControl>
                {formState.touchedFields.country && formState.errors.country && (
                  <div className='error-message'>{formState.errors.country.message || ""}</div>
                )}
              </>
            )}
          />

          {/* <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormControl fullWidth margin='normal' variant='outlined'>
                <InputLabel htmlFor='country-autocomplete'>Country</InputLabel>
                <Autocomplete
                  {...field}
                  id='country-autocomplete'
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  onInputChange={(e, value) => {
                    console.log(e, value, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    field.onChange(value?.id || "");
                    handleCountryChange(value);
                  }}
                  renderInput={(params) => <TextField {...params} label='' variant='outlined' />}
                />
              </FormControl>
            )}
          /> */}

          {/* <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormControl fullWidth margin='normal' variant='outlined'>
                <InputLabel htmlFor='country-autocomplete'>Country</InputLabel>
                <AsyncSelect
                  {...field}
                  cacheOptions
                  loadOptions={fetchLocationArray}
                  onChange={(f) => {
                    // formik.setFieldValue("location", f.value);
                    // setDummy({ value: f.value, label: f.label });
                  }}
                  defaultOptions
                  name='location'
                  // value={dummy}
                  onFocus={() => {
                    // setDummy({ value: "", label: "" });
                  }}
                />
              </FormControl>
            )}
          /> */}

          <Controller
            name='pincode'
            control={control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <TextField {...field} error={!!fieldState.error} label='Pincode' variant='outlined' fullWidth margin='normal' />
                {formState.touchedFields.pincode && formState.errors.pincode && (
                  <div className='error-message'>{formState.errors.pincode.message || ""}</div>
                )}
              </>
            )}
          />

          <Button type='submit' variant='contained' color='primary' className='button-next'>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserDataFormTwo;
