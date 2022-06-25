import React, { HTMLAttributes } from "react";

export interface RelatedBoxSuggestionItemProps
  extends HTMLAttributes<HTMLDivElement> {}

const RelatedBoxSuggestionItem: React.FC<RelatedBoxSuggestionItemProps> = ({
  children,
  ...rest
}) => {
  return (
    <div className="related-box-item" {...rest}>
      {children}
    </div>
  );
};

export default RelatedBoxSuggestionItem;
