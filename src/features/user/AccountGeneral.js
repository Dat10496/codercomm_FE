import React, { useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { updateUserProfile } from "./userSlice";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { fData } from "../../utils/numberFormat";

const updateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  const userId = user._id;

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: user?.jobTitle || "",
    company: user?.company || "",
    avatarUrl: user?.avatarUrl || "",
    coverUrl: user?.coverUrl || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    aboutMe: user?.aboutMe || "",
  };

  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId, ...data }));
    console.log(data);
  };
  const handleDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 1, textAlign: "center" }}>
            <FUploadAvatar
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography>
                  Allowed *.jpeg *.jpg *.png *.gif
                  {/* <br /> max size of {fData(314777)} */}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />

              <FTextField name="jobTitle" label="JobTitle" />
              <FTextField name="company" label="Company" />

              <FTextField name="phoneNumber" label="PhoneNumber" />
              <FTextField name="address" label="Address" />

              <FTextField name="city" label="City" />
              <FTextField name="country" label="Country" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FTextField name="coverUrl" label="Home Profile Cover Image" />
              <FTextField name="aboutMe" label="About Me" multiline rows={4} />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
