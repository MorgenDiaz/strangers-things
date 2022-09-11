const BigTextBox = ({ onChange, placeholder, value }) => {
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      required
      value={value}
      className="h-28 p-3 border-2 border-gray-700 rounded-md bg-gray-100 text-sm font-semibold text-gray-900"
    />
  );
};

export default BigTextBox;
