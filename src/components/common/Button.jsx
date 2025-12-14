import { Button as MuiButton } from "@mui/material";

const Button = ({
  children,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  ...props
}) => {
  return (
    <MuiButton variant={variant} color={color} fullWidth={fullWidth} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
