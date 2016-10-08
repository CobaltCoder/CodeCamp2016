var Clients = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired,
        vm: React.PropTypes.object.isRequired
},
    getDefaultProps: function () {
        return {
            clients: [],
            vm: {}
        };
    },
    getInitialState: function () {
        return {
            allClients: this.props.clients
        };
    },
    render: function () {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Clients
                        </h3>
                    </div>
                    <table className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allClients.map(function (client, clientIndex) {
                                return (
                                    <ClientRow client={client} index={clientIndex} />
                                )

                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type="text" id="txtNew" className="col-md-6 col-xs-8" />
                    &nbsp;<input type="button" className="md-raised md-primary md-button md-ink-ripple" value="Add" onClick={ this.Save } />
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        var url = "http://spdev/sites/ngreact/_api/lists/GetByTitle('Clients')/Items?$select=id,Title";

        $.ajax({
            url: url,
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                var clientsData = [];
                $.each(data.d.results, function (key, val) {
                    clientsData.push(val.Title);
                });

                this.setState({ allClients: clientsData });
            }.bind(this)
        });
    },
    Save: function () {
        clientData = this.state.allClients;
        clientData.push(document.getElementById('txtNew').value);
        this.setState({ allClients: clientData });
        this.props.vm.save(document.getElementById('txtNew').value);
    }
});

var ClientRow = React.createClass({
    propTypes: {
        client: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired
    },
    getDefaultProps: function () {
        return {
            contact: {},
            index: 0
        };
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.client}</td>
            </tr>
        );
    }
});

theApp.value('Clients', Clients);

theApp.directive('clients', function (reactDirective) {
    return reactDirective('Clients');
});