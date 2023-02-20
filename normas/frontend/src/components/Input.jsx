export default function Input(props) {
  return (
    <input
      className={`uk-input ${props.classes || ""}`}
      id={props.id}
      name={props.name}
      type={props.type || "text"}
      placeholder={props.placeholder || ""}
      hidden={props.hidden || false}
      readOnly={props.readOnly || false}
      required={props.required || false}
    />
  );
}
