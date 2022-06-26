import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import useTypeDelay from "../../hooks/useTypeDelay.hook";

export interface RelatedBoxTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  customInput?: React.ReactElement<InputHTMLAttributes<HTMLInputElement>>;
  onChange?: (value: string) => void;
  typeDelay?: number;
}

const RelatedBoxTextInput = (
  {
    customInput,
    onChange = () => null,
    typeDelay = 1200,
    ...rest
  }: RelatedBoxTextInputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
  const { data, setData } = useTypeDelay({
    delay: typeDelay,
    callback: (data) => {
      onChange(data);
    },
  });

  if (customInput) {
    return React.cloneElement(customInput, {
      ...customInput.props,
      onChange: (e) => setData(e.target.value),
      value: data,
    });
  } else {
    return (
      <input
        className="related-box-input"
        {...rest}
        onChange={(e) => setData(e.target.value)}
        value={data}
        ref={ref}
      />
    );
  }
};

export default forwardRef<HTMLInputElement, RelatedBoxTextInputProps>(
  RelatedBoxTextInput
);
