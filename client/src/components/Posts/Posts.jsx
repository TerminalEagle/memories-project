import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignItems={"center"} spacing={2}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
