import React, { InputHTMLAttributes } from "react";
import useTypeDelay from "../../hooks/useTypeDelay.hook";

export interface RelatedBoxTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  customComponent?: React.ReactElement<any>;
  onChange?: (value: string) => void;
  typeDelay?: number;
}

const RelatedBoxTextInput: React.FC<RelatedBoxTextInputProps> = ({
  customComponent,
  onChange = (v: string) => null,
  typeDelay = 1200,
  ...rest
}) => {
  const { data, setData } = useTypeDelay({
    delay: typeDelay,
    callback: (data) => {
      onChange(data);
    },
  });

  if (customComponent) {
    console.warn(
      "You are using a custom text input component, that way all native features from RelatedBox.InputText are disabled!"
    );
    return customComponent;
  } else {
    return (
      <input
        className="related-box-input"
        {...rest}
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
    );
  }
};

export default RelatedBoxTextInput;
