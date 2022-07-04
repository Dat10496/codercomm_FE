import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import UploadSingleFile from "../UploadSigleFile";

function FUploadImage({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value;

        return (
          <div>
            <UploadSingleFile
              accept="image/*"
              file={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {error.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
          </div>
        );
      }}
    />
  );
}

export default FUploadImage;
