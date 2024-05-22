import { Image, List, ListIcon, ListItem } from "@chakra-ui/react";
import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo1lightcrop.png";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.1em" spacing={4}>
      <ListItem>
        <Image src={logo} alt="DevBlog" height="40px"></Image>
      </ListItem>
      <ListItem>
        <ListIcon as={CalendarIcon} />
        <NavLink to="/">DashBoard</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">
          <ListIcon as={EditIcon} />
          New Post
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/profile">
          <ListIcon as={FaUserCircle}/>
          Profile
        </NavLink>
      </ListItem>
    </List>
  );
}
