import React, { HTMLAttributes } from "react";
import RelatedBoxSuggestionItem, {
  RelatedBoxSuggestionItemProps,
} from "./RelatedBoxSuggestionItem";

export interface RelatedBoxSuggestionsBoxProps
  extends HTMLAttributes<HTMLDivElement> {
  onSelectItem: (value: any) => void;
  data: any[];
  renderItem: (value: any) => React.ReactElement<RelatedBoxSuggestionItemProps>;
  onClose?: (v: any) => void;
  isOpen?: boolean;
  maxItems?: number;
  customComponent?: (
    items: React.ReactElement<RelatedBoxSuggestionItemProps>[]
  ) => React.ReactElement<RelatedBoxSuggestionsBoxProps>;
}

const RelatedBoxSuggestionsBox: React.FC<RelatedBoxSuggestionsBoxProps> = ({
  data,
  isOpen,
  renderItem,
  customComponent,
  onSelectItem = () => null,
  onClose = () => null,
  maxItems = 4,
  ...rest
}) => {
  const onSelect = (value: any) => {
    onSelectItem(value);
    onClose(value);
  };

  const items = data.slice(0, maxItems).map((d, i) =>
    React.createElement<RelatedBoxSuggestionItemProps>(
      RelatedBoxSuggestionItem,
      {
        key: i,
        onClick: () => onSelect(data[i]),
      },
      renderItem(d)
    )
  );

  return (
    <div className="related-suggestions-box">
      {customComponent ? (
        React.cloneElement(customComponent(items), {
          ...customComponent(items).props,
          style: {
            ...customComponent(items).props.style,
            visibility: isOpen && data.length > 0 ? "visible" : "hidden",
            position: "absolute",
            zIndex: "100",
            left: 0,
          },
        })
      ) : (
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
          {items}
        </div>
      )}
    </div>
  );
};

export default RelatedBoxSuggestionsBox;
