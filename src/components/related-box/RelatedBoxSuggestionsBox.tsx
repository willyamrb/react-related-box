import React, { HTMLAttributes } from "react";
import RelatedBoxSuggestionItem, {
  RelatedBoxSuggestionItemProps,
} from "./RelatedBoxSuggestionItem";

export interface RelatedBoxSuggestionsBoxProps
  extends HTMLAttributes<HTMLDivElement> {
  onSelectItem: (value: any) => void;
  isOpen?: boolean;
  onClose?: (v: string) => void;
  data: any[];
  maxItems?: number;
  renderItem: (value: any) => React.ReactElement<RelatedBoxSuggestionItemProps>;
}

const RelatedBoxSuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps> = ({
  onSelectItem = () => null,
  data,
  isOpen,
  onClose = () => null,
  renderItem,
  maxItems = 4,
  ...rest
}) => {
  const onSelect = (value: any) => {
    onSelectItem(value);
    onClose(value);
  };

  return (
    <div className="related-suggestions-box">
      <div
        className="related-suggestions-box-items"
        {...rest}
        style={{
          ...rest.style,
          visibility: isOpen && data.length > 0 ? "visible" : "hidden",
          position: "absolute",
          zIndex: "100",
          left: 0,
        }}
      >
        {data
          .filter((_, i) => i < maxItems)
          .map((d, i) =>
            React.createElement<RelatedBoxSuggestionItemProps>(
              RelatedBoxSuggestionItem,
              {
                key: i,
                onClick: () => onSelect(data[i]),
              },
              renderItem(d)
            )
          )}
      </div>
    </div>
  );
};

export default RelatedBoxSuggestionsBox;
