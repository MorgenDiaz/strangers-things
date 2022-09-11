const TextBox = ({
  onChange,
  type = "text",
  placeholder,
  value,
  required = false,
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      className="p-3 border-2 border-gray-700 rounded-md bg-gray-100 text-sm font-semibold text-gray-900  "
    />
  );
};

export default TextBox;
