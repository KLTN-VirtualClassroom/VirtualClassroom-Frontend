import "../Style/navbar.css"
function menubar(props) {
  return (
    <div>
      <input
        id="navbar-indicator"
        className="navbar-collapse"
      />

      <nav className="navbar">
        <a className="navbar-brand" href="/" onClick = {props.getClickedMain}>
          VirtualClassroom
        </a>

        <div className="navbar-left">
          <a className="nav-link" href="#/" onClick = {props.getClickedMaterial}>
            Material
          </a>
          <a className="nav-link" href="#/" onClick = {props.getClickedWhiteboard}>
            Whiteboard
          </a>
        </div>

        <div className="navbar-right">
          <a className="button1" href="#/">
            <span className="nav-link">Copy Link</span>
          </a>

          <label className="navbar-toggler" htmlFor="navbar-indicator">
            +
          </label>
          {/* <a class="nav-link" href="#">Copy link</a> */}
        </div>
      </nav>
    </div>
  );
}

export default menubar;
