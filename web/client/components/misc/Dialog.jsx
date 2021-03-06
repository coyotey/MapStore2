const PropTypes = require('prop-types');
/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root dir
 ectory of this source tree.
 */

const React = require('react');

const Draggable = require('react-draggable');
const Spinner = require('react-spinkit');
const assign = require('object-assign');
const Message = require('../I18N/Message');
require('./style/dialog.css');

class Dialog extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        style: PropTypes.object,
        backgroundStyle: PropTypes.object,
        className: PropTypes.string,
        maskLoading: PropTypes.bool,
        containerClassName: PropTypes.string,
        headerClassName: PropTypes.string,
        bodyClassName: PropTypes.string,
        footerClassName: PropTypes.string,
        onClickOut: PropTypes.func,
        modal: PropTypes.bool,
        start: PropTypes.object
    };

    static defaultProps = {
        style: {},
        backgroundStyle: {
            background: "rgba(0,0,0,.5)"
        },
        start: {x: 0, y: 0},
        className: "modal-dialog modal-content",
        maskLoading: false,
        containerClassName: "",
        headerClassName: "modal-header",
        bodyClassName: "modal-body",
        footerClassName: "modal-footer",
        modal: false
    };

    renderLoading = () => {
        if (this.props.maskLoading) {
            return (<div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "visible",
                margin: "auto",
                verticalAlign: "center",
                left: "0",
                background: "rgba(255, 255, 255, 0.5)",
                zIndex: 2
            }}><div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -40%)"
            }}><Message msgId="loading" /><Spinner spinnerName="circle" noFadeIn overrideSpinnerClassName="spinner"/></div></div>);
        }
    };

    renderRole = (role) => {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role);
    };

    render() {
        const dialog = (<Draggable start={this.props.start} handle=".draggable-header, .draggable-header *">
            <div id={this.props.id} style={{zIndex: 3, ...this.props.style}} className={this.props.className + " modal-dialog-container"}>
                <div className={this.props.headerClassName + " draggable-header"}>
                    {this.renderRole('header')}
                </div>
                <div className={this.props.bodyClassName}>
                    {this.renderLoading()}
                    {this.renderRole('body')}
                </div>
                {this.hasRole('footer') ? <div className={this.props.footerClassName}>
                    {this.renderRole('footer')}
                </div> : <span/>}
            </div>
        </Draggable>);
        let containerStyle = assign({}, this.props.style, this.props.backgroundStyle);
        return this.props.modal ?
            <div onClick={this.props.onClickOut} style={containerStyle} className={"fade in modal " + this.props.containerClassName} role="dialog">
            <div onClick={(evt)=> {evt.preventDefault(); evt.stopPropagation(); }} className="modal-dialog" style={{background: "transparent"}}>
                {dialog}
            </div></div> :
            dialog;
    }

    hasRole = (role) => {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role).length > 0;
    };
}

module.exports = Dialog;
