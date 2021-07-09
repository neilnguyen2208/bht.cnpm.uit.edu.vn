import React from 'react';
import upload_icon from 'assets/icons/64x64/b_nb_upload_icon_64x64.png'
import 'components/styles/Form.scss'
import { multipartRequest } from 'utils/requestUtils';
import './FormFileUploader.scss';
import delete_icon from 'assets/icons/24x24/gray_delete_icon_24x24.png';

//NOTE: not multiple files in a time.
class FormFileUploader extends React.Component {

    //onDelete, tag: dmID, id, name/content
    constructor(props) {
        super(props);
        this.state = { haveChoosenFiles: false }

        this.clientFiles = [
            { rank: 1, file: null, isNew: true, name: "", id: "", },
            { rank: 2, file: null, isNew: true, name: "", id: "" },
            { rank: 3, file: null, isNew: true, name: "", id: "" }
        ];

        this.uploadResponses = [
            { rank: 1, id: "", success: false, haveLoaded: false, },
            { rank: 2, id: "", success: false, haveLoaded: false },
            { rank: 3, id: "", success: false, haveLoaded: false }
        ];

        this.clientFileItems = <></>;
        this.isFirstTimeLoaded = false;
    }

    componentDidMount() {
        this.isFirstTimeLoaded = false;
        this.clientFiles = [
            { rank: 1, file: null, isNew: true, name: "", id: "", size: 0 },
            { rank: 2, file: null, isNew: true, name: "", id: "", size: 0 },
            { rank: 3, file: null, isNew: true, name: "", id: "", size: 0 }
        ];
    }

    //add a file
    //handle file client, will append new file to current client files list
    onFileChange = () => {

        //get file input element
        var fileInput = document.getElementById('file-input-' + this.props.id);

        //check duplicate files by name
        for (let i = 0; i < 3; i++) {

            //exist a file has name is the same of new file's name
            if (this.clientFiles[i].file !== null && this.clientFiles[i].file.name === fileInput.files[0].name) {
                document.querySelector(".form-error-label.ff-uploader").innerText = "Không được chọn file trùng";
                return;
            }
        }

        //assgin only allow add one file at once.
        if (this.clientFiles[0].file === null)
            this.clientFiles[0].file = fileInput.files[0];
        else {
            if (this.clientFiles[1].file === null)
                this.clientFiles[1].file = fileInput.files[0];
            else if (this.clientFiles[2].file === null)
                this.clientFiles[2].file = fileInput.files[0];
        }

        this.clientFileItems = this.clientFiles.map(fileItem => {
            if (fileItem.file !== null)
                return this.renderAFile(fileItem.file.name, fileItem.rank, fileItem.file.type, fileItem.file.size)
            return <></>;
        })

        this.setState({ haveChoosenFiles: true });

        //pass current files list to parrent
        if (this.props.onFileChange) {
            this.props.onFileChange(this.clientFiles.filter(fileItem => fileItem.file !== null))
        }

    }

    updateFileList = () => {

    }

    // uploadFile = (filesList) => {
    //     //response for appending to current array
    //     for (let i = 0; i < filesList.length; i++) {

    //         let fileData = new FormData();
    //         fileData.append('file', filesList[i]);

    //         multipartRequest.post(`/documents/upload`, fileData)
    //             .then(response => {
    //                 this.uploadResponses[i] = { ...this.uploadResponses[i], success: true, haveLoaded: true };
    //                 this.uploadResponses = [
    //                     ...this.uploadResponses
    //                 ];
    //             })
    //             .catch(error => {
    //                 this.uploadResponses[i] = { ...this.uploadResponses[i], success: false, haveLoaded: true };
    //                 this.uploadResponses = [
    //                     ...this.uploadResponses
    //                 ];
    //             })
    //     }
    // }

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

    renderAFile = (fileName, fileRank, fileType, fileSize) => {
        return <div className="file-list-item" key={fileRank}>
            <div className='form-tip-label'>
                Tên file: <strong>{fileName}</strong>
                <br />Kích thước: <strong>  {Math.round(fileSize / 1048576 * 100) / 100 + "MB"}</strong>, loại file: {fileType}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <img src={delete_icon} alt="" className="close_14x14" onClick={() => { this.deleteAFile(fileRank) }} />
            </div>
        </div>
    }

    deleteAFile = (fileRank) => {
        //update array
        this.clientFiles[fileRank - 1].file = null;
        this.clientFiles[fileRank - 1].isNew = true;
        
        //update UI
        this.clientFileItems = this.clientFiles.map(fileItem => {
            if (fileItem.file !== null)
                return this.renderAFile(fileItem.file.name, fileItem.rank);
            return <></>;
        })

        //pass to parent
        if (this.props.onFileChange) {
            this.props.onFileChange(this.clientFiles.filter(fileItem => fileItem.file !== null))
        }

        this.setState({});
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

        //initial UI 
        if (this.props.data && this.props.data.length > 0 && !this.isFirstTimeLoaded) {
            for (let i = 0; i < this.props.data.length; i++) {
                this.clientFiles[i].isNew = false;
                this.clientFiles[i].name = this.props.data[i].fileName;
                this.clientFiles[i].id = this.props.data[i].id;
                this.clientFiles[i].size = this.props.data[i].fileSize;
                this.clientFiles[i].type = "pdf";
            }

            this.clientFileItems = this.clientFiles.map(fileItem => {
                if (fileItem.id !== "")
                    return this.renderAFile(fileItem.name, fileItem.rank, fileItem.type, fileItem.size)
                return <></>;
            })

            this.isFirstTimeLoaded = true;
            this.setState({})
        }

        return (
            <div>

                <div className="form-tip-label" style={{ marginBottom: "8px" }} >
                    Nhập tối đa {this.props.maxFileCount ? this.props.maxFileCount : 3} file, tổng dung lượng không quá {Math.round(this.props.maxSize / 1048576 * 100) / 100 + "MB."}
                </div>

                <div className="file-input-wrapper">
                    <label className="file-input-label" id={'file-input-label-' + this.props.id} for={'file-input-' + this.props.id}>
                        <div className="c-pointer">
                            <img alt="...loading" className='file-input-image' src={upload_icon} />
                            <div className="form-tip-label t-a-center">Định dạng {this.props.fileType}
                            </div>
                        </div>
                        <input type="file"
                            className="file-input"
                            accept={this.props.fileType}
                            id={'file-input-' + this.props.id}
                            onChange={() => this.onFileChange()} />
                    </label>
                </div>

                <div className="form-error-label-container">
                    <span className="form-error-label ff-uploader" ></span>
                </div>


                {/* show list of files items */}
                <div className="form-tip-label file-input-text" style={{ marginTop: "20px" }}>
                    {this.clientFileItems}
                </div>

                < div className="form-line mg-top-5px" />
            </div >
        )
    }

}

export default FormFileUploader;
