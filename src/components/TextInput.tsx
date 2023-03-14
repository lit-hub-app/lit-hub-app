type TextInputProps = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
};

export default function TextInputComponent({ name, value, changeHandler }: TextInputProps): JSX.Element {
  return (
    <>
      <label htmlFor={name}>
        {name.split('-').join(' ')}
      </label >
      <input
        id={`${name}`}
        type='text'
        name={name}
        value={value}
        onChange={changeHandler}
      />
    </>
  );
};


