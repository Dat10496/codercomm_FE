import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Card, InputAdornment, Stack } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateUserProfile } from "./userSlice";

const SOCIAL_LINK = [
  {
    value: "facebookLink",
    icon: <FacebookIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "linkedinLink",
    icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "instagramLink",
    icon: <InstagramIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon sx={{ fontSize: 30 }} />,
  },
];

function AccountSocialLink() {
  const { user } = useAuth();
  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    linkedinLink: user?.linkedinLink || "",
    instagramLink: user?.instagramLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const isLoading = useSelector((state) => state.user.isLoading);

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINK.map((link) => (
            <FTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLink;
