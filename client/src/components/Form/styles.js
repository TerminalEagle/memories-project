import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
