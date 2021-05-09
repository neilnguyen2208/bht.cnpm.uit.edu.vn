import React from 'react'
// import './PostBrowser.scss'
import 'components/common/Paginator/Paginator.scss'


class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.maxItemPerPage = this.props.config.maxItemPerPage; //số lượng tối đa item mỗi page
        this.numPageShown = this.props.config.numPageShown; //số page được show trên thanh paginator, mặc định là 5, hiện tại chưa cho đổi.
        this.rawData = this.props.config.rawData; //dữ liệu được truyền vào từ component cha, áp dụng cho trường hợp type = "client"
        this.isTheFirstTimeLoaded = true;

        this.currentInteractList = [];
        this.arrayShownPages = [1, 2, 3, 4, 5]; //define which number will be output
        this.currentPage = 1;
        this.pageCount = 0;

    }

    componentDidMount() {

        this.isTheFirstTimeLoaded = true;
        // //get true pageCount
        // if (this.rawData.length % this.maxItemPerPage === 0) {
        //     this.rawData.pageCount = Math.floor(this.rawData.length / this.maxItemPerPage);
        // }
        // else {
        //     //ko sao dau
        //     this.pageCount = Math.floor(this.rawData.length / this.maxItemPerPage) + 1;
        // }


        // //initial array of page you want to render
        // if (this.pageCount < this.props.config.numShownPage) {
        //     this.arrayShownPages.splice(0, this.arrayShownPages.length);
        //     for (let i = 1; i <= this.pageCount; i++) {
        //         this.arrayShownPages.push(i);
        //     }
        //     // for (let i = this.props.config.numShownPage; i > this.pageCount; i--) {
        //     //     this.arrayShownPages.push("...");
        //     // }
        // }

        // this.currentInteractList.splice(0, this.currentInteractList.length);

        // //get true shown page //clear current list then add what we need
        // if (1 === this.pageCount) {
        //     for (let i = 0; i < this.rawData.length; i++)
        //         this.currentInteractList.push(this.rawData[i])
        // }
        // else {
        //     for (let i = 0; i < this.maxItemPerPage; i++)
        //         this.currentInteractList.push(this.rawData[i])
        // }

        // this.setState({});
    }

    // UI/UX when click on the pagination item
    onClickPaginationElement = (page_number, action) => {
        //handler action
        switch (action) {
            case "first":
                page_number = 1;
                break;
            case "prev":
                if (page_number > 1)
                    page_number--;
                break;
            case "next":
                if (page_number < this.pageCount)
                    page_number++;
                break;
            case "last":
                page_number = this.pageCount;
                break;
            default:
                break;
        }

        //handler page click

        if (!(this.pageCount < this.props.config.numShownPage)) {
            switch (page_number) {
                //set number of page in the midde => update array shown pages
                case 1:
                    this.arrayShownPages.splice(0, this.arrayShownPages.length);
                    this.arrayShownPages.push(page_number);
                    this.arrayShownPages.push(page_number + 1);
                    this.arrayShownPages.push(page_number + 2);
                    this.arrayShownPages.push(page_number + 3);
                    this.arrayShownPages.push(page_number + 4);
                    break;
                case 2:
                    this.arrayShownPages.splice(0, this.arrayShownPages.length);
                    this.arrayShownPages.push(page_number - 1);
                    this.arrayShownPages.push(page_number);
                    this.arrayShownPages.push(page_number + 1);
                    this.arrayShownPages.push(page_number + 2);
                    this.arrayShownPages.push(page_number + 3);
                    break;
                case this.pageCount:
                    this.arrayShownPages.splice(0, this.arrayShownPages.length);
                    this.arrayShownPages.push(page_number - 4);
                    this.arrayShownPages.push(page_number - 3);
                    this.arrayShownPages.push(page_number - 2);
                    this.arrayShownPages.push(page_number - 1);
                    this.arrayShownPages.push(page_number);
                    break;
                case this.pageCount - 1:
                    this.arrayShownPages.splice(0, this.arrayShownPages.length);
                    this.arrayShownPages.push(page_number - 3);
                    this.arrayShownPages.push(page_number - 2);
                    this.arrayShownPages.push(page_number - 1);
                    this.arrayShownPages.push(page_number);
                    this.arrayShownPages.push(page_number + 1);
                    break;
                default:
                    {
                        if (this.pageCount <= 5) {
                            break;
                        }
                        else {
                            this.arrayShownPages.splice(0, this.arrayShownPages.length);
                            this.arrayShownPages.push(page_number - 2);
                            this.arrayShownPages.push(page_number - 1);
                            this.arrayShownPages.push(page_number);
                            this.arrayShownPages.push(page_number + 1);
                            this.arrayShownPages.push(page_number + 2);
                        }
                    }
            }
        }

        //clear current list then add what we need
        this.currentInteractList.splice(0, this.currentInteractList.length);

        if (page_number === this.pageCount) { //if reach last page
            for (let i = (page_number - 1) * this.maxItemPerPage; i < this.rawData.length; i++)
                this.currentInteractList.push(this.rawData[i])
        }
        else { //if not last page
            for (let i = (page_number - 1) * this.maxItemPerPage; i < (page_number - 1) * this.maxItemPerPage + this.maxItemPerPage; i++)
                this.currentInteractList.push(this.rawData[i])
        }

        this.currentPage = page_number;
    }

    render() {

        this.rawData = this.props.config.rawData;

        //#region test paginator


        if (this.rawData.length > 0 && this.isTheFirstTimeLoaded) {
            //get true pageCount
            if (this.rawData.length % this.maxItemPerPage === 0) {
                this.pageCount = Math.floor(this.rawData.length / this.maxItemPerPage);
            }
            else {
                this.pageCount = Math.floor(this.rawData.length / this.maxItemPerPage) + 1;
            }

            //initial array of page you want to render
            if (this.pageCount < this.props.config.numShownPage) {
                this.arrayShownPages.splice(0, this.arrayShownPages.length);
                for (let i = 1; i <= this.pageCount; i++) {
                    this.arrayShownPages.push(i);
                }
                // for (let i = this.props.config.numShownPage; i > this.pageCount; i--) {
                //     this.arrayShownPages.push("...");
                // }
            }

            //render first page content
            this.currentInteractList.splice(0, this.currentInteractList.length);
            if (1 === this.pageCount) { //if have only one page
                for (let i = 0; i < this.rawData.length; i++)
                    this.currentInteractList.push(this.rawData[i])
            }
            else { //if have more one page
                for (let i = 0; i < this.maxItemPerPage; i++)
                    this.currentInteractList.push(this.rawData[i])
            }
            this.props.config.changePage(this.currentInteractList)

            this.isTheFirstTimeLoaded = false;
        }
        //#endregion

        let shownPages = this.arrayShownPages.map(page_number =>
            <div className="custom-page-item" id={page_number} key={page_number} >
                {
                    page_number !== this.currentPage
                        ?
                        <div>
                            {
                                page_number !== "..." ?
                                    < div className="deactivated-page" onClick={() => { this.props.config.changePage(this.currentInteractList); this.onClickPaginationElement(page_number, "") }}>
                                        {page_number}
                                    </div>
                                    :
                                    < div className="deactivated-page" >
                                        {page_number}
                                    </div>
                            }
                        </div>
                        :
                        <div className="activated-page" onClick={() => this.onClickPaginationElement(page_number, "")}>
                            {page_number}
                        </div>
                }
            </div >
        );

        return (
            <div className="custom-paginator" >
                <div className="first-page" onClick={() => { this.props.config.changePage(this.currentInteractList); this.onClickPaginationElement(this.currentPage, "first") }} > first</div>
                <div className="prev-page" onClick={() => { this.props.config.changePage(this.currentInteractList); this.onClickPaginationElement(this.currentPage, "prev") }}>Prev </div>
                {shownPages}
                <div className="next-page" onClick={() => { this.props.config.changePage(this.currentInteractList); this.onClickPaginationElement(this.currentPage, "next") }}> Next</div>
                <div className="last-page" onClick={() => { this.props.config.changePage(this.currentInteractList); this.onClickPaginationElement(this.currentPage, "last") }}>last </div>
            </div>
        );
    }
}
export default Paginator;