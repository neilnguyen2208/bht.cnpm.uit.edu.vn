import React from 'react';
import "./MyCoureses.scss";
import "components/common/CustomCKE/CKEditorContent.scss";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class CreatePost extends React.Component {
    constructor(props) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));

