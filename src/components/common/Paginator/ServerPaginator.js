import React, { Component } from 'react'
import { setSearchParam } from 'utils/urlUtils'
import 'components/common/Paginator/Paginator.scss'


class Paginator extends Component {
    constructor(props) {
        super(props);

        this.maxItemPerPage = 10; //số lượng tối đa item mỗi page
        this.numShownPage = 5; //số page được show trên thanh paginator, mặc định là 5, hiện tại chưa cho đổi.
        this.pageCount = 0;
        this.currentPage = 1;
        this.arrayShownPages = [1, 2, 3, 4, 5, 6, 7]; //define which number will be output
    }

    componentDidMount() {
    }

    // UI/UX when click on the pagination item
    onClickPaginationElement = (page_number, action) => {

        let arrayShownPages = this.arrayShownPages;
        page_number = parseInt(page_number);
        if (this.arrayShownPages === [NaN, NaN, NaN, NaN, NaN]) {
            this.arrayShownPages = [1, 2, 3, 4, 5, 6, 7]
        }

        //handler action: cac hanh dong khong lien quan toi so
        switch (action) {
            case "first":
                page_number = 1;
                break;
            case "prev":
                if (page_number > 1)
                    page_number--;
                break;
            case "next":
                if (page_number < this.props.config.pageCount)
                    page_number++;
                break;
            case "last":
                page_number = this.props.config.pageCount;
                break;
            default:
                break;
        }

        //neu page count > so page duoc show
        if (this.props.config.pageCount >= this.numShownPage) {
            //handler page click
            arrayShownPages.splice(0, arrayShownPages.length);

            switch (page_number) {
                //set number of page in the midde => update array shown pages
                case 1:
                    for (let i = page_number; i <= page_number + this.numShownPage - 1; i++)
                        arrayShownPages.push(i);
                    break;
                case 2:
                    for (let i = page_number - 1; i <= page_number + this.numShownPage - 2; i++)
                        arrayShownPages.push(i);
                    break;
                case 4:
                    for (let i = page_number - 3; i <= page_number + this.numShownPage - 4; i++)
                        arrayShownPages.push(i);
                    break;
                case this.props.config.pageCount:
                    for (let i = page_number - (this.numShownPage - 1); i <= page_number; i++)
                        arrayShownPages.push(i);
                    break;
                case this.props.config.pageCount - 1:
                    for (let i = page_number - (this.numShownPage - 2); i <= page_number + 1; i++)
                        arrayShownPages.push(i);
                    break;
                case this.props.config.pageCount - 2:
                case this.props.config.pageCount - 3:
                    for (let i = this.props.config.pageCount - (this.numShownPage - 1); i <= this.props.config.pageCount; i++)
                        arrayShownPages.push(i);
                    break;
                default:
                    {
                        if (this.props.config.pageCount <= 6) {
                            for (let i = 1; i <= this.props.config.pageCount; i++) {
                                arrayShownPages.push(i);
                            }
                        }
                        else {
                            if (!isNaN(page_number)) {
                                arrayShownPages.push(page_number - 2);
                                arrayShownPages.push(page_number - 1);
                                arrayShownPages.push(page_number);
                                arrayShownPages.push(page_number + 1);
                                arrayShownPages.push(page_number + 2);
                            }
                        }
                    }
            }
        }

        //clear current list then add what we need
        this.currentPage = page_number;

        if (action !== "first_load") {
            this.setState({});
        }

    }

    render() {

        let arrayShownPages = this.arrayShownPages;
        if (this.props.config) {
            if (this.numShownPage > this.props.config.pageCount) {
                this.numShownPage = this.props.config.pageCount;
            }
            //kiem tra xem gia tri truyen vao tu url co lon hon so page hay khong, neu lon hon thi lay so lon nhat
            if (this.props.config.currentPage < this.props.config.pageCount) {
                this.currentPage = this.props.config.currentPage;
                //neu so page nho hon 0 => chuyen sang trang 1
            }
            else {
                this.currentPage = this.props.config.pageCount;
                setSearchParam('page', this.currentPage);
            }
            if (this.currentPage <= 0) setSearchParam('page', 1);

            //neu so page nho hon so page duoc hien thi => hien so page nho hon
            if (this.props.config.pageCount < this.numShownPage) {
                arrayShownPages.splice(0, arrayShownPages.length);
                for (let i = 1; i <= this.props.config.pageCount; i++) {
                    arrayShownPages.push(i);
                }
            }
            else {
                if (this.currentPage === 1) {
                    arrayShownPages.splice(0, arrayShownPages.length);
                    for (let i = 1; i <= this.numShownPage; i++) {
                        arrayShownPages.push(i);
                    }
                }
                else {
                    this.onClickPaginationElement(this.currentPage, "first_load");
                }
            }

            let shownPages = arrayShownPages.map(page_number =>
                <div className="custom-page-item" id={page_number} key={page_number} >
                    {
                        page_number !== this.currentPage ?
                            < div className="deactivated-page" onClick={() => { this.onClickPaginationElement(page_number, ""); this.props.config.changePage(page_number); }}>
                                {page_number}
                            </div> :
                            <div className="activated-page" onClick={() => this.onClickPaginationElement(page_number, "")}>
                                {page_number}
                            </div>
                    }
                </div >
            );

            return (

                <div className="custom-paginator" >

                    {/* prev */}
                    {this.currentPage !== 1 ?
                        <div className="prev-page" onClick={() => { this.onClickPaginationElement(this.currentPage, "prev"); this.props.config.changePage(this.currentPage); }}>Prev </div>
                        : <div className="disabled-page" >Prev </div>
                    }

                    {/* first */}
                    {this.currentPage > 4 && this.props.config.pageCount > 6 ?
                        <>
                            <div className="first-page" onClick={() => { this.onClickPaginationElement(this.currentPage, "first"); this.props.config.changePage(1); }} > 1</div>
                            <div style={{ marginRight: "4px" }}>...</div>
                        </>
                        : <></>

                    }

                    {/* 5 page item */}
                    { shownPages}

                    {/* last */}
                    {
                        (((this.currentPage < this.props.config.pageCount - 3 && this.props.config.pageCount !== 7)
                            || (this.currentPage < this.props.config.pageCount - 2 && this.props.config.pageCount === 7)
                        ) && this.props.config.pageCount > 6) ?
                            <>
                                <div style={{ marginRight: "4px" }}>...</div>
                                <div className="last-page" onClick={() => { this.onClickPaginationElement(this.currentPage, "last"); this.props.config.changePage(this.props.config.pageCount); }}>{this.props.config.pageCount} </div>
                            </> : <></>
                    }

                    {/* next */}
                    {this.currentPage !== this.props.config.pageCount ?
                        <div className="next-page" onClick={() => { this.onClickPaginationElement(this.currentPage, "next"); this.props.config.changePage(this.currentPage) }}> Next</div>
                        :
                        <div className="disabled-page" > Next</div>
                    }
                </div >

            );
        }
        else return <></>;
    }


}
export default Paginator;

