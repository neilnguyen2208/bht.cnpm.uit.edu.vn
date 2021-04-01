import React from "react";
import "./Table.scss"

export default class Table extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <table className='pos-relative' >
                {this.props.children}
            </table >
        );
    }
}
