import React from 'react';
import upload_icon from 'assets/icons/64x64/b_nb_upload_icon_64x64.png'
import 'components/styles/Form.scss'
import { multipartRequest } from 'utils/requestUtils';

class FormFileUploader extends React.Component {

    //onDelete, tag: dmID, id, name/content
    constructor(props) {
        super(props);
        this.state = { haveChoosenFiles: false }

        this.clientFiles = [
            { rank: 1, value: "FIRST_FILE", text: '', hasFile: false },
            { rank: 2, value: "SECOND_FILE", text: '', hasFile: false },
            { rank: 3, value: "THIRD_FILE", text: '', hasFile: false }
        ];

        this.uploadResponses = [
            { rank: 1, id: "", success: false, haveLoaded: false, },
            { rank: 2, id: "", success: false, haveLoaded: false },
            { rank: 3, id: "", success: false, haveLoaded: false }
        ];
        this.clientFileItems = <></>;
    }

    //handle file client, will append new file to current client files list
    onFileChange = () => {
        var fileInput = document.getElementById('file-input-' + this.props.id);

        this.clientFiles.forEach(item => {
            item.hasFile = false;
            item.text = ''
        });

        for (let i = 0; i < fileInput.files.length; i++) {
            this.clientFiles[i].text = ` - Tên file: ${fileInput.files.item(i).name}\n, kích thước:  ${Math.round(fileInput.files.item(i).size / 1048576 * 100) / 100 + "MB"}, loại file:  ${fileInput.files.item(i).type}`;
            this.clientFiles[i].hasFile = true;
        }

        this.clientFileItems = this.clientFiles.map(file =>
            <div className='form-tip-label'>
                {file.text}
            </div>
        )

        this.setState({ haveChoosenFiles: true });

        //max file, size, type
        if (this.props.onFileChange) {
            this.props.onFileChange(document.getElementById('file-input-' + this.props.id).files)
        }

    }

    updateFileList = () => {

    }

    uploadFile = (filesList) => {
        //response for appending to current array
        for (let i = 0; i < filesList.length; i++) {

            let fileData = new FormData();
            fileData.append('file', filesList[i]);

            multipartRequest.post(`/documents/upload`, fileData)
                .then(response => {
                    this.uploadResponses[i] = { ...this.uploadResponses[i], success: true, haveLoaded: true };
                    this.uploadResponses = [
                        ...this.uploadResponses
                    ];
                })
                .catch(error => {
                    this.uploadResponses[i] = { ...this.uploadResponses[i], success: false, haveLoaded: true };
                    this.uploadResponses = [
                        ...this.uploadResponses
                    ];
                })
        }
    }

    handleOverMaxSize = () => {
        //xu ly sau
    }

    handleOverMaxItemCount = () => {
        //show label off max file
    }

    handleWrongType = () => {

    }

    onAllFileProccessed = () => {

    }

    onDeleteAFile = (value) => {
        //set new value for files
        //set new value for client files
    }

    resetUploadState = () => {
        this.uploadResponses.forEach(item => {
            item.success = false;
            item.haveLoaded = false
        })
        this.setState({ haveChoosenFiles: false })
    }

    checkUploadDone = () => {
        //check hasFile
        let hasFileCount = 0;
        this.clientFiles.forEach(item => {
            if (item.hasFile) hasFileCount = hasFileCount + 1;
        });

        //check load done.
        let hasUploadedCount = 0;
        this.uploadResponses.forEach(item => {
            if (item.hasFile) hasUploadedCount = hasUploadedCount + 1;
        });

        if (hasUploadedCount === 0 && hasUploadedCount !== hasFileCount)
            return false;
        return true;
    }

    render() {
        //reset choosen state if has choosen a file
        if (this.state.haveChoosenFiles) { this.resetUploadState() }

        //check all file and responses id done
        if (this.checkUploadDone()) { console.log("All file uploaded") };

        return (
            <div>
                <div className="file-input-wrapper">
                    <label className="file-input-label" id={'file-input-label-' + this.props.id} for={'file-input-' + this.props.id}>
                        <div className="c-pointer">
                            <img alt="...loading" className='file-input-image' src={upload_icon} />
                            <div className="form-tip-label t-a-center">Định dạng {this.props.fileType}
                                <br></br>Dung lượng không quá {Math.round(this.props.maxSize / 1048576 * 100) / 100 + "MB"}
                            </div>
                        </div>
                        <input type="file"
                            multiple={this.props.multiple}
                            className="file-input"
                            accept={this.props.fileType}
                            id={'file-input-' + this.props.id}
                            onChange={() => this.onFileChange()} />
                    </label>
                </div>

                <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                </div>

                {/* show list of files items */}
                <div className="form-tip-label file-input-text" style={{ marginTop: "20px" }}>
                    {this.clientFileItems}
                </div>

                < div className="form-line mg-top-5px" />
            </div>
        )
    }

}

export default FormFileUploader;
