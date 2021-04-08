/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Paginator from 'components/common/Paginator/ServerPaginator'
import UserItem from 'components/user/UserItem'

//import for redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllUsers } from 'redux/services/userServices'
import { getAllRoles } from 'redux/services/roleServices'

import AdminSidebar from 'layouts/AdminSidebar'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Combobox from 'components/common/Combobox/Combobox'

class UserManagement extends Component {

    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllRoles();

        this.queryParamObject = {
            "page": 1,
        }

        this.searchParamObject = {
            "page": 1,
        }

        setQueryParam(this.queryParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getAllUsers(this.searchParamObject);
        this.setState({});
    }

    onRoleOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1, "roleID": selectedOption.id
        });
        this.searchParamObject = {
            ...this.searchParamObject,
            "roleID ": selectedOption.id,
            page: 1
        }
        this.props.getAllUsers(this.searchParamObject);
        this.setState({});
    }

    render() {
        console.log(this.props.rolesList);
        if (!this.props.isRoleLoading && this.props.rolesListHaveAll) {
            this.comboboxGroup =
                <div className="filter-container">
                    <div className="p-searchbar-container">
                        {/* page search bar */}
                        <div className="d-flex">
                            <input type="text" className="p-searchbar-input mg-left-5px pm" placeholder="Nhập từ khoá " />
                            <button className="p-searchbar-btn" onClick={() => { this.onSearchTermChange() }}>
                                <div className="d-flex">
                                    Tìm kiếm
                                </div>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Role:</div>
                        <div className="mg-left-5px">
                            <Combobox
                                options={this.props.rolesListHaveAll}
                                selectedOptionID={0}
                                onOptionChanged={(selectedOption) => this.onRoleOptionChange(selectedOption)}
                                id="umrf-combobox" //user management role filter
                            ></Combobox>
                        </div>
                    </div>
                </div>
        }
        if (!this.props.isListLoading && this.props.usersList && !this.props.isRoleLoading && this.props.rolesList) {
            this.listView = this.props.usersList.map((userItem) =>
                <UserItem
                    key={userItem.id}
                    roleID={userItem.role.id}
                    roleName={userItem.role.name}
                    userID={userItem.id}
                    displayName={userItem.displayName}
                    avatarURL={userItem.avatarURL}
                    email={userItem.email}
                    postCount={userItem.postCount}
                    docCount={userItem.documentCount}
                    score={userItem.score}
                    rolesList={this.props.rolesList}
                >
                </UserItem>
            )
        }
        return (
            <div className="left-sidebar-layout" >
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ NGƯỜI DÙNG" />
                    <div className="content-container">
                        {(!this.props.isRoleLoading) ? this.comboboxGroup : <></>}
                        {!this.props.isListLoading && this.props.usersList ?
                            <>
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <div>{this.listView}</div>
                                <Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page')
                                }}
                                />
                            </>
                            :
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div>
                        }
                    </div >
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.role.allRoles);
    return {
        usersList: state.user.allUsers.data,
        isListLoading: state.user.allUsers.isLoading,
        totalPages: state.user.allUsers.totalPages,
        totalElements: state.user.allUsers.totalElements,

        isRoleLoading: state.role.allRoles.isLoading,
        rolesList: state.role.allRoles.data,
        rolesListHaveAll: state.role.allRoles.searchData,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllUsers, getAllRoles
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement));
