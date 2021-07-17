import React from 'react';
import upload_icon from 'assets/icons/64x64/b_nb_upload_icon_64x64.png'
import 'components/styles/Form.scss'
import './FormFileUploader.scss';

//NOTE: not multiple files in a time.
class FormFileUploader extends React.Component {

    componentDidMount() {
        this.isFirstTimeLoaded = false;
    }

    //add a file
    //handle file client, will append new file to current client files list
    onFileChange = () => {
        //get file input element
        var fileInput = document.getElementById('file-input-' + this.props.id);

        //pass current files list to parrent
        if (this.props.onFileChange) {
            this.props.onFileChange(fileInput.files[0])
        }

    }

    render() {

        return (
            <div>
                <div className="file-input-wrapper">
                    <label className="" id={'file-input-label-' + this.props.id} for={'file-input-' + this.props.id}>
                        <div className="file-input-button" >
                            <img alt="...loading" className='file-input-button-img' style={{ height: "20px", paddingRight: "5px", paddingTop: "2px" }} src={upload_icon} />
                            Thêm file excel
                        </div>
                        <input type="file"
                            className="file-input"
                            accept={this.props.fileType}
                            id={'file-input-' + this.props.id}
                            onChange={() => this.onFileChange()} />
                    </label>
                </div>
            </div >
        )
    }

}

export default FormFileUploader;
