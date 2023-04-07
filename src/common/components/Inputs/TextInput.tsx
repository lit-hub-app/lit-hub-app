type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
};

export default function TextInputComponent({ name, value, changeHandler }: Props): JSX.Element {
  return (
    <div className='text-input'>
      <label htmlFor={name}>
        {name.split('-').join(' ')}
      </label >
      <input
        type='text'
        name={name}
        value={value}
        // placeholder={name}
        onChange={changeHandler}
      />
    </div>
  );
};


