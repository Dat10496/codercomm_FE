import isString from "lodash/isString";
import { useDropzone } from "react-dropzone";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import RejectionFile from "./RejectionFile";

const RootStyle = styled("div")(({ theme }) => ({
  width: 144,
  height: 144,
  margin: "auto",
  borderRadius: "50%",
  padding: theme.spacing(1),
  border: `1px dashed ${alpha("#919EAB", 0.32)}`,
}));

const DropZoneStyle = styled("div")(({ theme }) => ({
  zIndex: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  //   "&:hover": {
  //     cursor: "pointer",
  //     "&.placeholder": {
  //       zIndex: 1,
  //     },
  //   },
}));

const PlaceholderStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: "#919EAB",
  backgroundColor: "#919EAB",
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": { opacity: 0.72 },
}));

function UploadAvatar({ error, file, helperText, sx, ...other }) {
  //   console.log(file);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({ multiple: false, ...other });
  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: "error.light",
          }),
          ...sx,
        }}
      >
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input {...getInputProps()} />
          {file && (
            <Box
              sx={{
                zIndex: 8,
                overflow: "hidden",
                "& img": {
                  objectFit: "cover",
                  width: 1,
                  height: 1,
                },
              }}
            >
              <img alt="avatar" src={isString(file) ? file : file.preview} />
            </Box>
          )}
          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: "common.white",
                bgcolor: "grey.900",
                "&:hover": {
                  opacity: 0.72,
                },
                ...((isDragReject || error) && {
                  bgcolor: "error.lighter",
                }),
              }),
            }}
          >
            <AddAPhotoRoundedIcon sx={{ width: 24, height: 24, mb: 1 }} />
            <Typography variant="caption">
              {file ? "Update photo" : "Upload photo"}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>
      {helperText && helperText}

      {fileRejections.length > 0 && (
        <RejectionFile fileRejections={fileRejections} />
      )}
    </>
  );
}

export default UploadAvatar;
