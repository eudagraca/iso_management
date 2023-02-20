export default function Button(props) {
    return (
      <button
        className={"uk-button uk-button-secondary " + `${props.direction}`}
        type="submit"
      >
        {props.text}
      </button>
    );
  }
  