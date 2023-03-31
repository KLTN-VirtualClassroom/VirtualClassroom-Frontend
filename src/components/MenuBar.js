import "../Style/navbar.css";
import { Switch } from "antd";
import {useNavigate} from 'react-router-dom'
function MenuBar(props) {
  //const navigate = useNavigate();
  return (
    <div>
      <input id="navbar-indicator" className="navbar-collapse" />

      <nav className="navbar">
        <div className="navbar-brand" onClick={props.getClickedMain}>
          VirtualClassroom
        </div>

        <div className="navbar-left">
          {props.role === "teacher" ? (
            <>
              <div className="nav-link" onClick={props.getClickedMaterial}>
                Material
              </div>
              <div className="nav-link" onClick={props.getClickedWhiteboard}>
                Whiteboard
              </div>
              <div className="nav-link">
                <Switch
                  defaultChecked={false}
                  unCheckedChildren="Disallow Student"
                  checkedChildren="Allow Student"
                  onChange={(checked) => props.getClickedAllow(checked)}
                ></Switch>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="navbar-right">
          {/* <a className="end-button" href="#/" onClick = {props.getClickedAllow}>
            <span className="end-span-button" >End Meet</span>
          </a> */}

          <div className="nav-link-end" onClick="history.back()" >
            END
          </div>
          <label className="navbar-toggler" htmlFor="navbar-indicator">
            +
          </label>
          {/* <a class="nav-link" href="#">Copy link</a> */}
        </div>
      </nav>
    </div>
  );
}

export default MenuBar;
