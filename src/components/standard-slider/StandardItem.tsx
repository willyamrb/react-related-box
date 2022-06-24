import React from "react";

export interface StandardItemProps {
  width: string;
}

const StandardItem: React.FC<StandardItemProps> = ({ width, children }) => {
  return <div>{children}</div>;
};

export default StandardItem;
