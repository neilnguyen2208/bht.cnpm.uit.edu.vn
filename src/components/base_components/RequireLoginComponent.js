import authService from 'authentication/authServices.js';
import { openModal } from 'redux/services/modalServices'
import React from "react";
import { Link } from 'react-router-dom'

//component wrapper by this component will show a LoginModal if user not logged in or not granted permissions
//Set blur = true=> wrapped component will be blur and disabled if current component is not allowed by an action 
//Set isAny = true => user only need to grant one of array of permissions

export class RequireLogin extends React.Component {
  handleClick = () => {
    if (
      !this.props.requiredAction && ((this.props.isAny && authService.isGrantedAny(this.props.permissions))
        || (authService.isGrantedAll(this.props.permissions))
        || (this.props.requiredAction && this.props.availableActions.includes(this.props.requiredAction))
      )) {
      //granted action
      if (this.props.expectedEvent)
        this.props.expectedEvent();
    }
    else {
      openModal("confirmation",
        {
          title: "Đăng nhập",
          text: "Hành động này cần đăng nhập!",
          confirmText: "Đăng nhập",
          onConfirm: () => { authService.doLogin() }
        });
    }
  }

  render() {
    //if logged in and props.availableAction => handle by action

    //showOnAction === true + not granted action => hide 
    //showOnAction === false + not granted action => show in banned state 
    //granted action => show and call event
    //show and required login =>  

    //requiredAction: false || undefined || ... => base on permission to require login.
    //permissions
    //isAny

    //availableActions && isLoggedIn() 
    if ((authService.isLoggedIn() && this.props.availableActions)) {

      //granted requiredAction => call event
      if (this.props.availableActions.includes(this.props.requiredAction)) {

        if (!this.props.isLink)
          return (
            <div onClick={this.props.expectedEvent ? () => this.props.expectedEvent() : () => { }}>
              {this.props.children}
            </div>
          );
        else
          return <Link to={this.props.to} onClick={this.props.expectedEvent ? () => this.props.expectedEvent() : () => { }}>
            {this.props.children}
          </Link>
      }

      //showOnAction&&not granted requiredAction => hide this component.
      if (this.props.showOnAction)
        return (
          <div>
          </div>
        );

      //!showOnAction&&!requiredAction => hide this component.
      return (
        <div style={{ opacity: "50%" }} className="banned-action">
          {this.props.children}
        </div>
      );
    }

    //!isLoggedIn() && requiredAction
    if (!authService.isLoggedIn() && this.props.requiredAction && this.props.availableActions && !this.props.showOnAction) {
      return (
        <div onClick={this.handleClick}>
          {this.props.children}
        </div>);
    }

    if ((authService.isLoggedIn() && !this.props.availableActions)) {
      return (
        <div onClick={this.props.expectedEvent ? () => this.props.expectedEvent() : () => { }}>
          {this.props.children}
        </div>
      );
    }

    //!isLoggedIn() && !showOnAction && !requiredAction => show component and required login on click.
    if (!authService.isLoggedIn() && !this.props.showOnAction && !this.props.requiredAction)
      return (
        <div onClick={this.handleClick}>
          {this.props.children}
        </div>
      );

    if (!authService.isLoggedIn() && !this.props.showOnAction)
      return (
        <div onClick={this.handleClick}>
          {this.props.children}
        </div>
      );

    //!isLoggedIn() && showOnAction && !grant requiredAction => hide
    return (
      <div>
      </div>
    );
  }
};


