import React from 'react';
import 'components/styles/Form.scss'
import './FormFileUploader.scss';
import image_uploader from 'assets/icons/64x64/image_uploader.png';

//NOTE: not multiple files in a time.
class FormFileUploader extends React.Component {

    componentDidMount() {
        //assign initial data
        if (this.props.initialData) {
            document.getElementById("image-input-placeholder" + this.props.id).src = this.props.initialData;
        }
        if (this.props.AVATAR_TYPE) {
            if (this.props.initialData)
                document.getElementById("image-input-placeholder" + this.props.id).classList.remove("d-none");
            document.getElementById("iid-container" + this.props.id).classList.add("_avatar");
            document.getElementById("image-input-placeholder" + this.props.id).classList.add("_avatar");
        }
    }

    //handle file client, will append new file to current client files list
    onImageChange = () => {
        //get file input element
        let fileInput = document.getElementById('image-input-' + this.props.id);
        document.getElementById("image-input-placeholder" + this.props.id).src = URL.createObjectURL(fileInput.files[0]);
        document.getElementById("image-input-placeholder" + this.props.id).classList.remove("d-none");
        document.getElementById("iid-container" + this.props.id).style.borderRadius = "50%";

        //pass current files list to parrent
        if (this.props.onImageChange) {
            this.props.onImageChange(fileInput.files[0]);
        }

    }

    render() {
        return (
            <div>
                {!this.props.AVATAR_TYPE &&
                    <div className="form-tip-label" style={{ marginBottom: "8px" }} >
                        Dung lượng không quá {Math.round(this.props.maxSize / 1024 * 100) / 100 + "KB."}
                    </div>
                }

                <div className="file-input-wrapper">
                    <label className="file-input-label" id={'file-input-label-' + this.props.id} for={'image-input-' + this.props.id}>

                        {/* image placeholder */}
                        <img src="" alt="" className="image-input-placeholder d-none" id={"image-input-placeholder" + this.props.id} />

                        {/* decoration */}
                        <div src="" alt="" className="iid-container" id={"iid-container" + this.props.id} style={{ padding: "10px" }}>
                            <div className="image-input-decoration">
                                <img alt="...loading" className='image-input-image' src={image_uploader} />
                                {/* Định dạng {this.props.fileType}
                                {this.props.recommendedSize &&
                                    <div className="d-flex">
                                        <div className="mg-auto" style={{ width: "fit-content", display: "block" }}>Cỡ ảnh đề xuất: {this.props.recommendedSize} px
                                        </div>
                                    </div>
                                } */}
                            </div>
                        </div>

                        {/* input */}
                        <input type="file"
                            className="image-input"
                            accept={this.props.fileType}
                            recommendedSize={this.props.recommendedSize}
                            id={'image-input-' + this.props.id}
                            onChange={() => this.onImageChange()} />
                    </label>
                </div>

                <div className="form-error-label-container">
                    <span className="form-error-label fi-uploader" ></span>
                </div>

                < div className="form-line mg-top-5px" />

                {this.props.AVATAR_TYPE &&
                    <div className="form-tip-label" style={{ marginBottom: "8px" }} >
                        Dung lượng không quá {Math.round(this.props.maxSize / 1024 * 100) / 100 + "KB."}
                    </div>
                }
            </div >
        )
    }

}

export default FormFileUploader;
