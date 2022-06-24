import React, { HTMLAttributes } from "react";

export interface RelatedBoxSuggestionItemProps
  extends HTMLAttributes<HTMLDivElement> {
  customItem?: React.ReactElement<any>;
}

const RelatedBoxSuggestionItem: React.FC<RelatedBoxSuggestionItemProps> = ({
  children,
  customItem,
  ...rest
}) => {
  if (customItem) {
    return <div {...rest}>{customItem}</div>;
  }

  return (
    <div className="related-box-item" {...rest}>
      {children}
    </div>
  );
};

export default RelatedBoxSuggestionItem;
