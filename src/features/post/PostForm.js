import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, alpha, Box, Stack } from "@mui/material";
import { FormProvider, FTextField } from "../../components/form";
import { borderColor } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { createPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const yupSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    dispatch(createPost(data)).then(() => reset());
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            placeholder="Share what you are thinking here ..."
            multiline
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: ` 1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FTextField name="image" placeholder="Image" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
