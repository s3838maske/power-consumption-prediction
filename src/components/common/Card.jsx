import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Box,
} from "@mui/material";

/**
 * Reusable Card Component with consistent styling
 */
const Card = ({
  title,
  subtitle,
  children,
  actions,
  elevation = 2,
  sx = {},
  headerSx = {},
  contentSx = {},
  ...props
}) => {
  return (
    <MuiCard elevation={elevation} sx={{ height: "100%", ...sx }} {...props}>
      {title && (
        <>
          <CardHeader
            title={title}
            subheader={subtitle}
            sx={{
              pb: 1,
              ...headerSx,
            }}
          />
          <Divider />
        </>
      )}
      <CardContent sx={{ ...contentSx }}>{children}</CardContent>
      {actions && (
        <>
          <Divider />
          <CardActions>{actions}</CardActions>
        </>
      )}
    </MuiCard>
  );
};

export default Card;
