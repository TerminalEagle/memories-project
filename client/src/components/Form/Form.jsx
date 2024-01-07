import { useEffect, useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ setCurrentId, currentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) => state.posts.find((post) => post._id === currentId));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId) {
      dispatch(updatePost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper style={{ padding: "16px" }}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <form autoComplete="off" noValidate className={`${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData((prev) => {
              return { ...prev, title: event.target.value };
            })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData((prev) => {
              return { ...prev, message: event.target.value };
            })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData((prev) => {
              return { ...prev, tags: event.target.value.split(",") };
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            mutliple={false}
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData((prev) => {
                return { ...prev, selectedFile: base64 };
              })
            }
          ></FileBase>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
