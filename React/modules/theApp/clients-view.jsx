var Clients = React.createClass({
    getInitialState: function () {
        return {
            allClients: []
        };
    },
    componentWillMount: function () {
        performance.mark('reactStart');
    },
    addNew: function (Client) {
        console.log('add new here');
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
        var url = "http://spdev/sites/react/_api/lists/GetByTitle('Clients')/Items?$select=id,Title";

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
        ClientsStore.addClient(document.getElementById('txtNew').value)
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
    getInitialState: function () {
        return {
            pointer: 'pointer'
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

var ClientAdd = React.createClass({
    render: function () {
        return (
            <div>
                <textarea id="addAnswer" className="col-md-6 col-xs-8" onChange={ this._onChange }></textarea>
                &nbsp;<input type="button" className="btn btn-primary" value="Add" onClick={ this.Save } />
            </div>
        )
    },
    Save: function(){
        clientData = this.state.allClients;
        clientData.push(this.txtNew.value);
        this.setState({ allClients: clientData});
    }.bind(this)
});
