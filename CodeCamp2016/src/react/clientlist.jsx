var reactApp = reactApp || {};

var ProjectContacts = reactApp.ProjectContacts =  React.createClass({
    propTypes: {
        companies: React.PropTypes.array.isRequired,
        vm: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        return {
            companies: [],
            vm: {}
        };
    },
    getInitialState: function () {
        return {
            t0: performance.now()
        };
    },
    componentWillMount: function () {
        performance.mark('reactStart');
    },
    addNew: function (Contact) {
        customSelected = null;
        this.props.vm.editing = false;
        this.props.vm.matchingContact.length = 0;
    },
    render: function () {
        reactApp.ProjectContacts.vm = this.props.vm;
        reactApp.ProjectContacts.selectContact = this.props.selectContact;
        return (
            <div>
                {this.props.companies.map(function (el, index) {
                    return (
                        <div className="panel panel-primary panel-project-manager">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                {el.name}
                            </h3>

                            <button className="btn btn-primary" type="button" ng-show="{this.props.vm.userCanAdd}" onClick={this.addNew} data-toggle="modal" data-target="#contactModal">
                                <i className="glyphicon glyphicon-plus-sign"></i>
                            </button>
                        </div>
                        <table className="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Escalation Priority</th>
                                    <th>Role</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Emergency Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {el.contacts.map(function (contact, contactIndex) {
                                    return (
                                        <ProjectContactRow contact={contact} index={contactIndex} vm={ reactApp.ProjectContacts.vm} selectContact={ reactApp.ProjectContacts.selectContact} />
                                    )

                                        })}
                            </tbody>
                        </table>
                        </div>
                    );
    })}
            </div>
            );
},
componentDidMount: function () {
    performance.mark('reactEnd');
    var t1 = performance.now();
    console.log('React took', (t1 - this.state.t0).toFixed(4), 'milliseconds to generate:');
}
});

var ProjectContactRow = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired,
        vm: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        return {
            contact: {},
            index: 0,
            vm: {}
        };
    },
    getInitialState: function () {
        return {
            pointer: 'pointer'
        };
    },
    modifyExisting: function (Contact) {
        this.props.vm.currentProjectNotify = false;
        this.props.vm.editing = true;
        this.props.vm.editingProjectContactID = this.props.contact.ProjectContactID;
        this.props.vm.selectContact(this.props.contact.ContactID, false);
    },
    render: function () {
        return (
            <tr data-toggle="modal" data-target="#contactModal" className="clickable" style={{cursor: this.state.pointer}} onClick={this.modifyExisting}>
                <td>{this.props.contact.EscalationPriority}</td>
                <td>{this.props.contact.ContactRole} </td>
                <td><span ng-show="{this.props.contact.Title}">{this.props.contact.Title}</span><span ng-hide="{this.props.contact.Title}">{this.props.contact.ContactName}</span></td>
                <td>{this.props.contact.Phone}</td>
                <td><a ng-href="mailto:{this.props.contact.Email}">{this.props.contact.Email}</a></td>
                <td>{this.props.contact.EmergencyPriority}</td>
            </tr>
        );
},
});

theApp.value('ProjectContacts', ProjectContacts);

theApp.directive('projectContacts', function (reactDirective) {
    return reactDirective('ProjectContacts');
});
