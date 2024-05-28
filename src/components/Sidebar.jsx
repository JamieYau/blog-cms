import { Image, Link, List, ListIcon, ListItem } from "@chakra-ui/react";
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
        <Link as={NavLink} to="/">
          <ListIcon as={CalendarIcon} />
          DashBoard
        </Link>
      </ListItem>
      <ListItem>
        <Link as={NavLink} to="/posts/create">
          <ListIcon as={EditIcon} />
          New Post
        </Link>
      </ListItem>
      <ListItem>
        <Link as={NavLink}  to="/profile">
          <ListIcon as={FaUserCircle} />
          Profile
        </Link>
      </ListItem>
    </List>
  );
}
