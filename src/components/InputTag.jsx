import { useState, useRef } from "react";
import { Box, Flex, Tag, TagCloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

// Utility function to transform the tag string
const transformTag = (tag) => {
  const trimmedTag = tag.trim().replace(/\s+/g, " ");
  const capitalizedTag = trimmedTag
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return `#${capitalizedTag.replace(/^#/, "")}`; // Ensure # prefix and remove any leading #
};

export default function InputTag({ initialTags, onChange }) {
  const [tags, setTags] = useState([...initialTags]);
  const refInput = useRef(null);

  const handleKeyDown = (event) => {
    let newTag = refInput.current.value.trim().replace(",", "");
    switch (event.key) {
      case ",":
      case " ":
      case "Enter":
        event.preventDefault(); // Prevent default behavior
        if (newTag.length > 0) {
          newTag = transformTag(newTag);
          if ([...tags].includes(newTag)) {
            refInput.current.value = "";
            break;
          }
          const tempTags = [...tags, newTag];
          setTags(tempTags);
          refInput.current.value = "";
          onChange(tempTags);
        }
        break;
      case "Backspace":
        if (refInput.current.value === "" && tags.length > 0) {
          const tempTags = [...tags];
          tempTags.pop();
          setTags(tempTags);
          onChange(tempTags);
        }
        break;
      default:
        break;
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    refInput.current.size = value.length || 1; // Adjust input size based on content
  };

  const handleDelItem = (index) => {
    const tempTags = [...tags];
    tempTags.splice(index, 1);
    setTags(tempTags);
    onChange(tempTags);
  };

  return (
    <Box border="1px solid #e2e8f0" borderRadius="5px" p={2}>
      <Flex align="center" gap={1} onClick={() => refInput.current.focus()}>
        {tags.map((text, i) => (
          <Tag key={i + "_" + text} colorScheme="teal" mt={1}>
            {text}
            <TagCloseButton onClick={() => handleDelItem(i)} />
          </Tag>
        ))}
        <input
          ref={refInput}
          onKeyDown={handleKeyDown}
          onChange={handleChangeInput}
          size={1}
          className="border-none outline-none mt-1"
        />
      </Flex>
    </Box>
  );
}

InputTag.propTypes = {
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

InputTag.defaultProps = {
  initialTags: [],
};
