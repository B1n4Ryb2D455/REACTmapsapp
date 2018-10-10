import React, { component } from "react";
import listitem from "./listitem";

export default class venuelist extends Component {
    render() {
        return (
            <ol className="venueList">
            <listitem />
            </ol>
        )
    }
}