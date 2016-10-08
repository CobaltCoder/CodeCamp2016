var clientsData = [];

var ClientsStore = new EventEmitter();

var listTitleLocal = 'Clients';

ClientsStore.emitChange = function () {
    this.emit('change');
};

ClientsStore.addChangeListener = function (listener) {
    this.on('change', listener);
};

ClientsStore.getClients = function () {
    return clientsData;
};

ClientsStore.addClient = function (newClient) {
    var qryPayloadLocal = {
        __metadata: {
            type: 'SP.Data.' + listTitleLocal.replace(/ /g, '_x0020_') + 'ListItem'
        },
        "Title": newClient,
    };

    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitleLocal + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        data: JSON.stringify(qryPayloadLocal),
        success: function (data) {
            console.log('added');
        },
        error: function (err) {
            console.log(err);
        }
    });

    //$.post("http://spdev/sites/react/_api/lists/getbytitle('" + listTitleLocal + "')/Items", qryPayloadLocal);

    this.emitChange();
};

ClientsStore.markAsCorrect = function (id) {

    for (key in answerData) {
        answerData[key].correct = false;
    }

    answerData[id].correct = true;
    this.emitChange();
};

ClientsDispatcher.register(function (action) {

    switch (action.actionType) {
        case ClientsConstants.Clients_ANSWER_ADDED:
            {
                ClientsStore.addAnswer(action.newAnswer);
                break;
            }
        case ClientsConstants.Clients_ANSWER_MARKED_CORRECT:
            {
                ClientsStore.markAsCorrect(action.id);
                break;
            }
    }
});