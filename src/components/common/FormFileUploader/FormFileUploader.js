import React from 'react';
import upload_icon from 'assets/icons/64x64/b_nb_upload_icon_64x64.png'
import 'components/styles/Form.scss'
import { multipartRequest } from 'utils/requestUtils';

class FormFileUploader extends React.Component {

    //onDelete, tag: dmID, id, name/content
    constructor(props) {
        super(props);

        this.clientFiles = [
            { rank: 1, value: "FIRST_FILE", text: '' },
            { rank: 2, value: "SECOND_FILE", text: '' },
            { rank: 3, value: "THIRD_FILE", text: '' }
        ];

        this.uploadResponses = [
            { rank: 1, id: "", success: false },
            { rank: 2, id: "", success: false },
            { rank: 3, id: "", success: false }
        ];
        this.clientFileItems = <></>;
    }

    //handle file client, will append new file to current client files list
    onFileChange = () => {

        var fileInput = document.getElementById('file-input-' + this.props.id);
        for (let i = 0; i < fileInput.files.length; i++) {
            this.clientFiles[i].text = ` - Tên file: ${fileInput.files.item(i).name}\n Kích thước:  ${Math.round(fileInput.files.item(i).size / 1048576 * 100) / 100 + "MB"}, loại file:  ${fileInput.files.item(i).type} 
            // \n`;
        }

        this.clientFileItems = this.clientFiles.map(file =>
            <div className='form-tip-label'>
                {file.text}
            </div>
        )
        console.log("file change");
        //max file, size, type
        if (this.props.onFileChange) {
            // this.props.onFileChange(document.getElementById('file-input-' + this.props.id).files)
        }

        this.setState({});
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
                    this.uploadResponses[i] = { ...this.uploadResponses[i], success: true };
                    this.uploadResponses = [
                        ...this.uploadResponses
                    ];
                })
                .catch(error => {
                    this.uploadResponses[i] = { ...this.uploadResponses[i], success: false };
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

    }

    render() {
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
                {this.clientFilesItems}

                <div className="form-line mg-top-5px" />
            </div>
        )
    }

}

export default FormFileUploader;
