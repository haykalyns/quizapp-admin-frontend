import PropTypes from "prop-types"; // Import prop-types package
import styled from "styled-components";

const Primary = styled.button`
  color: white;
  background: blue;
  padding: 10px 20px;
  font-size: 16px;

  &:hover {
    background: lightblue;
  }
`;

const Secondary = styled.button`
  color: white;
  background: green;
`;

const PrimaryOutline = styled.button`
  color: blue;
  background: white;
  border: 1px solid blue;
`;

const Button = ({ title, mode, type, onClick }) => {
  switch (mode) {
    case "secondary":
      return (
        <Secondary type={type} onClick={onClick}>
          {title}
        </Secondary>
      );

    case "primary-outline":
      return (
        <PrimaryOutline type={type} onClick={onClick}>
          {title}
        </PrimaryOutline>
      );

    default:
      return (
        <Primary type={type} onClick={onClick}>
          {title}
        </Primary>
      );
  }
};

// Add prop-types validation
Button.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
