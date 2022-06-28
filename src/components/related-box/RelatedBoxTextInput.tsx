import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

export interface RelatedBoxTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  customInput?: React.ReactElement<InputHTMLAttributes<HTMLInputElement>>;
  onChange?: (value: string) => void;
  typeDelay?: number;
  data?: string;
  setData?: (v: string) => void;
}

const RelatedBoxTextInput = (
  {
    customInput,
    onChange = () => null,
    typeDelay = 600,
    data,
    setData = () => null,
    ...rest
  }: RelatedBoxTextInputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
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
