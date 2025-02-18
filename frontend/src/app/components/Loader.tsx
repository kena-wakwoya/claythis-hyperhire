import React from "react";
interface LoaderProps {
  color?: string;
  width?: string;
  height?: string;
}
const Loader: React.FC<LoaderProps> = ({
  color = "black",
  width = "w-5",
  height = "h-5",
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${width} ${height} animate-spin rounded-full border-4 border-solid ${color} border-t-transparent`}
      ></div>
    </div>
  );
};
export default Loader;