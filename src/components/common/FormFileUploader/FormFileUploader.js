import React, { Component } from 'react';
import upload_icon from 'assets/icons/64x64/b_nb_upload_icon_64x64.png'
import 'components/styles/Form.scss'
//Set text props for this component
class FormFileUploader extends Component {

    //onDelete, tag: dmID, id, name/content
    constructor(props) {
        super(props);
        this.state = { data: "" }
    }

    onFileChange = () => {
        var name = document.getElementById('file-input-' + this.props.id);
        let displayText = '';
        for (let i = 0; i < name.files.length; i++) {
            displayText = displayText + ` - Tên file: ${name.files.item(i).name}\n Kích thước:  ${Math.round(name.files.item(i).size / 1048576 * 100) / 100 + "MB"}, loại file:  ${name.files.item(i).type} \n`;
        }

        document.querySelector('.form-tip-label.file-info').innerText = displayText;

        //max file, size, type
        if (this.props.onFileChange) {
            this.props.onFileChange(document.getElementById('file-input-' + this.props.id).files)
        }
    }

    handleOverMaxSize = () => {
        //xu ly sau
    }

    handleOverMaxItemCount = () => {

    }

    handleWrongType = () => {

    }

    render() {
        return (
            <div className="file-input-wrapper">
                <label className="file-input-label" id={'file-input-label-' + this.props.id} for={'file-input-' + this.props.id}>
                    <div className="c-pointer">
                        <img alt="...loading..." className='file-input-image' src={upload_icon} />
                        <div className="form-tip-label t-a-center">Định dạng {this.props.fileType}
                            <br></br>Dung lượng không quá {Math.round(this.props.maxSize / 1048576 * 100) / 100 + "MB"}
                        </div>
                    </div>
                    <input type="file" multiple={this.props.multiple} className="file-input" accept={this.props.fileType} id={'file-input-' + this.props.id} onChange={() => this.onFileChange()} />
                </label>
            </div>
        )
    }

}

export default FormFileUploader;
