type TextInputProps = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
};

export default function TextInputComponent({ name, value, changeHandler }: TextInputProps): JSX.Element {
  return (
    <label>
      {name}
      <input
        type='text'
        name={name}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};


