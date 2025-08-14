interface InterfaceInput {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  err?: any;
}

const Input = ({
  label,
  type,
  id,
  placeholder,
  err,
  ...props
}: InterfaceInput) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        className="border border-black py-1 px-3 text-sm"
        placeholder={placeholder}
        {...props}
      />
      {err}
    </div>
  );
};

export default Input;
