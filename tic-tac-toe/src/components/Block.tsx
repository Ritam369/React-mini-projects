import * as React from "react";

interface BlockProps {
  value?: string | null;
  onClick?: () => void;
}

const Block: React.FC<BlockProps> = ({ value, onClick }) => {
  return (
    <div className="block" onClick={onClick}>
      {value}
    </div>
  );
};

export default Block;
