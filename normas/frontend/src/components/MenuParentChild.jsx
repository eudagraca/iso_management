export default function MenuParentChild({ name, url }) {
  return (
    <li>
      <a href={url}>{name}</a>
    </li>
  );
}
