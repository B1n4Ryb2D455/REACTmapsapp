import React, { component } from "react";
import listitem from "./listItem";

export default class venueList extends Component {
    render() {
        return (
            <ol className="venueList">
            <listItem />
            </ol>
        )
    }
}