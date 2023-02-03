import "../Style/navbar.css"
function menubar(props) {
  return (
    <div>
      <input
        id="navbar-indicator"
        className="navbar-collapse"
      />

      <nav className="navbar">
        <div className="navbar-brand"  onClick = {props.getClickedMain}>
          VirtualClassroom
        </div>

        <div className="navbar-left">
          <div className="nav-link"  onClick = {props.getClickedMaterial}>
            Material
          </div>
          <div className="nav-link"  onClick = {props.getClickedWhiteboard}>
            Whiteboard
          </div>
        </div>

        <div className="navbar-right">
          <a className="button1" href="#/" onClick = {props.getClickedAllow}>
            <span className="nav-link" >Copy Link</span>
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
