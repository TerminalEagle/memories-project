import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  formGrid: {
    marginBottom: "16px",
  },
  button: {
    marginBottom: "16px !important",
  },
}));
