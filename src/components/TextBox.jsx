const TextBox = ({
  onChangedHandler,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <input
      onChange={onChangedHandler}
      type={type}
      placeholder={placeholder}
      required={required}
      className="p-3 border-2 border-gray-700 rounded-md bg-gray-100 text-sm font-semibold text-gray-900  "
    />
  );
};

export default TextBox;
