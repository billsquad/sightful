import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import { ChangeEvent } from "react";

interface CustomInputProps {
  name: string;
  label: string;
  autoFocus?: boolean;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  autoFocus,
  type = "text",
  handleChange,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        // @ts-ignore
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};
