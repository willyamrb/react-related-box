import React from "react";
import StandardItem, { StandardItemProps } from "./StandardItem";
import "./index.scss";

interface StandardSliderComponentProps {
  width?: string;
}

export interface StandardSliderProps
  extends React.FC<StandardSliderComponentProps> {
  Item: React.FC<StandardItemProps>;
}

const StandardSlider: StandardSliderProps = ({ children }) => {
  return <div className="button">{children}</div>;
};

StandardSlider.Item = StandardItem;

export default StandardSlider;
