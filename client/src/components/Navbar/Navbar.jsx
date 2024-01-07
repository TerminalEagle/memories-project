import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import memories from "../../assets/memories.png";
import useStyles from "./styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionsTypes";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate(0);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" style={{ color: "blue", fontSize: "2.5rem", lineHeight: "1" }}>
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height={60} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl ? user.result.imageUrl : user.result.picture}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button onClick={logout} variant="contained" color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" color="primary" variant="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
