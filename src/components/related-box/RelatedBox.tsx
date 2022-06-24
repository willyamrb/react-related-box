import React from "react";
import RelatedBoxTextInput, {
  RelatedBoxTextInputProps,
} from "./RelatedBoxTextInput";
import "./index.scss";
import RelatedBoxSuggestionsBox, {
  RelatedBoxSuggestionsBoxProps,
} from "./RelatedBoxSuggestionsBox";
import useDisclosure from "../../hooks/useDisclosure.hook";
import RelatedBoxSuggestionItem, {
  RelatedBoxSuggestionItemProps,
} from "./RelatedBoxSuggestionItem";

interface RelatedBoxComponentProps {
  children: React.ReactElement<
    RelatedBoxTextInputProps & RelatedBoxSuggestionsBoxProps
  >[];
}

export interface RelatedBoxProps extends React.FC<RelatedBoxComponentProps> {
  InputText: React.FC<RelatedBoxTextInputProps>;
  SuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps>;
  SuggestionItem: React.FC<RelatedBoxSuggestionItemProps>;
}

const RelatedBox: RelatedBoxProps = ({ children }) => {
  if (!Array.isArray(children))
    throw new Error("Must be more than 1 children!");

  const textInput = children.find(
    (d) => (d.type as any).displayName === "RelatedBoxTextInput"
  );

  const suggestionsBox = children.find(
    (d) => (d.type as any).displayName === "RelatedBoxSuggestionsBox"
  );

  if (!textInput)
    throw new Error("RelatedBox.InputText component is required!");

  if (!suggestionsBox)
    throw new Error("RelatedBox.SuggestionsBox component is required!");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="related-box">
      {React.cloneElement<RelatedBoxTextInputProps>(textInput, {
        ...textInput.props,
        onFocus: onOpen,
        onBlur: onClose,
      })}
      {React.cloneElement<RelatedBoxSuggestionsBoxProps>(suggestionsBox, {
        ...suggestionsBox.props,
        isOpen,
      })}
    </div>
  );
};

RelatedBox.InputText = RelatedBoxTextInput;
RelatedBox.SuggestionsBox = RelatedBoxSuggestionsBox;
RelatedBox.SuggestionItem = RelatedBoxSuggestionItem;

export default RelatedBox;
