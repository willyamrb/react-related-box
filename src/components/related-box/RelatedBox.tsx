import React from "react";
import RelatedBoxTextInput, {
  RelatedBoxTextInputProps,
} from "./RelatedBoxTextInput";
import "./index.scss";
import RelatedBoxSuggestionsBox, {
  RelatedBoxSuggestionsBoxProps,
} from "./RelatedBoxSuggestionsBox";
import useDisclosure from "../../hooks/useDisclosure.hook";

interface RelatedBoxComponentProps {
  children: React.ReactElement<
    RelatedBoxTextInputProps & RelatedBoxSuggestionsBoxProps
  >[];
}

export interface RelatedBoxProps extends React.FC<RelatedBoxComponentProps> {
  InputText: React.FC<RelatedBoxTextInputProps>;
  SuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps>;
}

const RelatedBox: RelatedBoxProps = ({ children }) => {
  if (!Array.isArray(children))
    throw new Error("Must be more than 1 child inside RelatedBox Component!");

  const textInput = children.find(({ type }) => type === RelatedBoxTextInput);

  const suggestionsBox = children.find(
    ({ type }) => type === RelatedBoxSuggestionsBox
  );

  if (!textInput)
    throw new Error("RelatedBox.InputText component is required!");

  if (!suggestionsBox)
    throw new Error("RelatedBox.SuggestionsBox component is required!");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="related-box" tabIndex={1} onFocus={onOpen} onBlur={onClose}>
      {React.cloneElement<RelatedBoxTextInputProps>(textInput)}
      {React.cloneElement<RelatedBoxSuggestionsBoxProps>(suggestionsBox, {
        ...suggestionsBox.props,
        isOpen,
        onClose,
      })}
    </div>
  );
};

RelatedBox.InputText = RelatedBoxTextInput;
RelatedBox.SuggestionsBox = RelatedBoxSuggestionsBox;

export default RelatedBox;
