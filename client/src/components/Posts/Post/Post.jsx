import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment/moment";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id)) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp; {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpIcon fontSize="small" />
        &nbsp; Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(post?.creator === user?.result?.sub || post?.creator === user?.result?._id) && (
        <div className={classes.overlay2}>
          <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="large" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color={"textSecondary"} gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled={!user?.result} color="primary" onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(post?.creator === user?.result?.sub || post?.creator === user?.result?._id) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
