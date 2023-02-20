function MessageAlert({ type, message }) {
  if (message) {
    return (
      <div
        className={`uk-alert-${type || "primary"} uk-alert`}
        uk-toggle=".my-class"
        uk-alert="uk-alert"
      >
        <a className="uk-alert-close" uk-close="uk-close" href={() => true}>
          &nbsp;
        </a>
        <p className="uk-text-default uk-margin-small-left uk-text-light">
          {message || ""}
        </p>
      </div>
    );
  }
}

export default MessageAlert;
