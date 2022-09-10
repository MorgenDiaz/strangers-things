const PrimaryButton = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="rounded-lg border-2 border-gray-900 bg-gray-700 h-12 text-gray-200 uppercase font-bold tracking-wide "
    />
  );
};

export default PrimaryButton;
