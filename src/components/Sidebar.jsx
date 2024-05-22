import { Image, List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo1crop.png"

export default function Sidebar() {
  return (
    <List>
      <ListItem>
        <Image src={logo} alt="DevBlog" height="40px"></Image>
      </ListItem>
      <ListItem>
        <NavLink to="/">DashBoard</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">New Post</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/profile">Profile</NavLink>
      </ListItem>
    </List>
  );
}
