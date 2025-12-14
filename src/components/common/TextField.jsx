import { TextField as MuiTextField } from "@mui/material";

const TextField = ({
  fullWidth = true,
  variant = "outlined",
  margin = "normal",
  ...props
}) => {
  return (
    <MuiTextField
      fullWidth={fullWidth}
      variant={variant}
      margin={margin}
      {...props}
    />
  );
};

export default TextField;
