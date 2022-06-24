import React, { HTMLAttributes } from "react";
import RelatedBoxSuggestionItem, {
  RelatedBoxSuggestionItemProps,
} from "./RelatedBoxSuggestionItem";

export interface RelatedBoxSuggestionsBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (value: number) => void;
  children: React.ReactElement<RelatedBoxSuggestionItemProps>[];
  isOpen?: boolean;
}

const RelatedBoxSuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps> = ({
  onSelect = () => null,
  children,
  isOpen,
  ...rest
}) => {
  const items = children.filter(
    (d) => (d.type as any).displayName === "RelatedBoxSuggestionItem"
  );

  if (items.length !== children.length)
    throw new Error(
      "All itens inside RelatedBox.SuggestionsBox must be a RelatedBox.SuggestionItem, if you want a custom item use the property customItem prop from RelatedBox.SuggestionItem"
    );

  return (
    <div
      className="related-suggestions-box"
      {...rest}
      tabIndex={100}
      style={{
        visibility: isOpen && children.length > 0 ? "visible" : "hidden",
      }}
    >
      <div className="related-suggestions-box-items">
        {children.map((d, i) =>
          React.cloneElement<RelatedBoxSuggestionItemProps>(d, {
            ...d.props,
            onClick: () => onSelect(i),
          })
        )}
      </div>
    </div>
  );
};

export default RelatedBoxSuggestionsBox;
