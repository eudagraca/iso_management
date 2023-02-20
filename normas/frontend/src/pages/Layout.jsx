const Layout = ({ header, aside, content }) => {
  return (
    <div>
      {header}
      {aside}

      <div
        className="uk-container uk-container-expand"
        id="content"
        data-uk-height-viewport="expand: true"
      >
        {content}
      </div>
    </div>
  );
};

export default Layout;
