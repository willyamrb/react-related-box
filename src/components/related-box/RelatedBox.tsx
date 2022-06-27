import React from "react";
import RelatedBoxTextInput, {
  RelatedBoxTextInputProps,
} from "./RelatedBoxTextInput";
import "./index.scss";
import RelatedBoxSuggestionsBox, {
  RelatedBoxSuggestionsBoxProps,
} from "./RelatedBoxSuggestionsBox";
import useDisclosure from "../../hooks/useDisclosure.hook";
import useTypeDelay from "../../hooks/useTypeDelay.hook";

interface RelatedBoxComponentProps {
  objectKeyValue?: string;
  clearOnSelect?: boolean;
  children: React.ReactElement<
    RelatedBoxTextInputProps & RelatedBoxSuggestionsBoxProps
  >[];
}

export interface RelatedBoxProps extends React.FC<RelatedBoxComponentProps> {
  InputText: React.FC<RelatedBoxTextInputProps>;
  SuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps>;
}

const RelatedBox: RelatedBoxProps = ({
  children,
  objectKeyValue,
  clearOnSelect = false,
}) => {
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

  const { data, setData } = useTypeDelay({
    delay: textInput.props.typeDelay,
    callback: (data) => {
      if (!textInput.props.onChange) return;
      textInput.props.onChange(data);
    },
  });

  const onSelect = (v: any) => {
    onClose();

    if (clearOnSelect) {
      setData("");
      return;
    }

    if (typeof v === "object") {
      if (!objectKeyValue)
        return console.warn(
          "to 'data' objects you need to specify the 'objectKeyValue' prop in RelatedBox.SuggestionsBox component, that way it will show the selected value"
        );

      setData(v[objectKeyValue]);
    } else {
      setData(v);
    }
  };

  return (
    <div className="related-box" tabIndex={1} onFocus={onOpen} onBlur={onClose}>
      {React.cloneElement<RelatedBoxTextInputProps>(textInput, {
        ...textInput.props,
        data,
        setData: (v) => setData(v),
      })}
      {React.cloneElement<RelatedBoxSuggestionsBoxProps>(suggestionsBox, {
        ...suggestionsBox.props,
        isOpen,
        onClose: onSelect,
      })}
    </div>
  );
};

RelatedBox.InputText = RelatedBoxTextInput;
RelatedBox.SuggestionsBox = RelatedBoxSuggestionsBox;

export default RelatedBox;
