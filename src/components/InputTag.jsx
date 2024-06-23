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
  const [dataInput, setDataInput] = useState([...initialTags]);
  const refInput = useRef(null);

  const handleKeyDown = (event) => {
    let newText = refInput.current.value.trim().replace(",", "");
    switch (event.key) {
      case ",":
      case " ":
      case "Enter":
        event.preventDefault(); // Prevent default behavior
        if (newText.length > 0) {
          newText = transformTag(newText);
          const dataInputTemp = [...dataInput, newText];
          setDataInput(dataInputTemp);
          refInput.current.value = "";
          onChange(dataInputTemp);
        }
        break;
      case "Backspace":
        if (refInput.current.value === "" && dataInput.length > 0) {
          const dataInputTemp = [...dataInput];
          dataInputTemp.pop();
          setDataInput(dataInputTemp);
          onChange(dataInputTemp);
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
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    setDataInput(dataInputTemp);
    onChange(dataInputTemp);
  };

  return (
    <Box border="1px solid #e2e8f0" borderRadius="5px" p={2}>
      <Flex align="center" gap={1} onClick={() => refInput.current.focus()}>
        {dataInput.map((text, i) => (
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
