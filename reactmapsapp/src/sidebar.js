import React, { component } from "react";
import venuelist from "./venuelist";

export default class sidebar extends Component {
    render() {
        return(<div className="sideBar">
            <venuelist />
        </div>)
    }
}