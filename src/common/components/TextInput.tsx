type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
};

export default function TextInputComponent({ name, value, changeHandler }: Props): JSX.Element {
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


