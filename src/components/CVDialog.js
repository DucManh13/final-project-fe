import Divider from "@mui/material/Divider";
import Article from "@mui/icons-material/Article";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect, useContext } from "react";
import { postInfo } from "../services/AxiosServices";
import { AuthContext } from "../contexts/AuthContext";
import LoadingLayer from "./LoadingLayer";

function CVDialog({ isOpen, handleClose, handleSubmit }) {
  const [CVs, setCVs] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    postInfo(
      "/cv",
      { id: loggedInUser.id },
      (response) => {
        if (mounted) setCVs(response.data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, [loggedInUser]);

  return (
    <>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Choose a CV to apply</DialogTitle>
        <Divider />
        <List>
          {CVs.map((cv) => (
            <ListItem button key={cv.id} onClick={() => handleSubmit(cv.id)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "lightgreen", color: "green" }}>
                  <Article />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={cv.cvName} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <LoadingLayer open={isLoading} />
    </>
  );
}

export default CVDialog;
