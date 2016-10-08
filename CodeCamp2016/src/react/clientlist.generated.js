﻿// @hash v3-992EFB2E5125B8DCC1134F2323BCA5A6E914BB0C
// Automatically generated by ReactJS.NET. Do not edit, your changes will be overridden.
// Version: 3.0.0 (build 0) with Babel 6.7.7
// Generated at: 10/4/2016 9:18:28 AM
///////////////////////////////////////////////////////////////////////////////
var reactApp = reactApp || {};

var ProjectContacts = reactApp.ProjectContacts = React.createClass({
    displayName: "ProjectContacts",

    propTypes: {
        companies: React.PropTypes.array.isRequired,
        vm: React.PropTypes.object.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return {
            companies: [],
            vm: {}
        };
    },
    getInitialState: function getInitialState() {
        return {
            t0: performance.now()
        };
    },
    componentWillMount: function componentWillMount() {
        performance.mark('reactStart');
    },
    addNew: function addNew(Contact) {
        customSelected = null;
        this.props.vm.editing = false;
        this.props.vm.matchingContact.length = 0;
    },
    render: function render() {
        reactApp.ProjectContacts.vm = this.props.vm;
        reactApp.ProjectContacts.selectContact = this.props.selectContact;
        return React.createElement(
            "div",
            null,
            this.props.companies.map(function (el, index) {
                return React.createElement(
                    "div",
                    { className: "panel panel-primary panel-project-manager" },
                    React.createElement(
                        "div",
                        { className: "panel-heading" },
                        React.createElement(
                            "h3",
                            { className: "panel-title" },
                            el.name
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", type: "button", "ng-show": "{this.props.vm.userCanAdd}", onClick: this.addNew, "data-toggle": "modal", "data-target": "#contactModal" },
                            React.createElement("i", { className: "glyphicon glyphicon-plus-sign" })
                        )
                    ),
                    React.createElement(
                        "table",
                        { className: "table table-striped table-condensed" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    "Escalation Priority"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Role"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Name"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Phone"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Email"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Emergency Priority"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            el.contacts.map(function (contact, contactIndex) {
                                return React.createElement(ProjectContactRow, { contact: contact, index: contactIndex, vm: reactApp.ProjectContacts.vm, selectContact: reactApp.ProjectContacts.selectContact });
                            })
                        )
                    )
                );
            })
        );
    },
    componentDidMount: function componentDidMount() {
        performance.mark('reactEnd');
        var t1 = performance.now();
        console.log('React took', (t1 - this.state.t0).toFixed(4), 'milliseconds to generate:');
    }
});

var ProjectContactRow = React.createClass({
    displayName: "ProjectContactRow",

    propTypes: {
        contact: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired,
        vm: React.PropTypes.object.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return {
            contact: {},
            index: 0,
            vm: {}
        };
    },
    getInitialState: function getInitialState() {
        return {
            pointer: 'pointer'
        };
    },
    modifyExisting: function modifyExisting(Contact) {
        this.props.vm.currentProjectNotify = false;
        this.props.vm.editing = true;
        this.props.vm.editingProjectContactID = this.props.contact.ProjectContactID;
        this.props.vm.selectContact(this.props.contact.ContactID, false);
    },
    render: function render() {
        return React.createElement(
            "tr",
            { "data-toggle": "modal", "data-target": "#contactModal", className: "clickable", style: { cursor: this.state.pointer }, onClick: this.modifyExisting },
            React.createElement(
                "td",
                null,
                this.props.contact.EscalationPriority
            ),
            React.createElement(
                "td",
                null,
                this.props.contact.ContactRole,
                " "
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "span",
                    { "ng-show": "{this.props.contact.Title}" },
                    this.props.contact.Title
                ),
                React.createElement(
                    "span",
                    { "ng-hide": "{this.props.contact.Title}" },
                    this.props.contact.ContactName
                )
            ),
            React.createElement(
                "td",
                null,
                this.props.contact.Phone
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "a",
                    { "ng-href": "mailto:{this.props.contact.Email}" },
                    this.props.contact.Email
                )
            ),
            React.createElement(
                "td",
                null,
                this.props.contact.EmergencyPriority
            )
        );
    }
});

theApp.value('ProjectContacts', ProjectContacts);

theApp.directive('projectContacts', function (reactDirective) {
    return reactDirective('ProjectContacts');
});