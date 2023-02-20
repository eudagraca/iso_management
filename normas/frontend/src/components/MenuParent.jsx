import MenuParentChild from "./MenuParentChild";

export default function MenuParent(props) {
  return (
    <li className="uk-parent">
      <a href>
        <span
          className="uk-margin-small-right"
          data-uk-icon={props.icon}
        ></span>
        {props.mainTitle}
      </a>
      <ul className="uk-nav-sub">
        {props.childTitle.map(function (task, index) {
          return <MenuParentChild key={index} name={task.index} url={task.url} />;
        })}
      </ul>
    </li>
  );
}
