const RadioButton = ({ id, value, checked, onChange, label }) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center space-x-3 cursor-pointer group"
    >
      <div className="relative">
        <input
          type="radio"
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full group-hover:border-blue-500 transition-colors">
          <div
            className={`absolute w-3 h-3 bg-blue-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
              checked ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
      <span className="text-lg font-medium  group-hover:text-blue-200 transition-colors">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
