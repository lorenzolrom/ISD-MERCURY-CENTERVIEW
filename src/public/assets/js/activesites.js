/**
 * Generate a list of all active sites
 * @param json
 */
function displayActiveSites(json)
{
    let container = document.querySelector("#sites");

    $.each(json, function(index, value)
    {
        let site = document.createElement("div");
        $(site).addClass("col-sm-4 mb-4");

        let card = document.createElement("div");
        $(card).addClass("card bg-success h-100");

        let body = document.createElement("div");
        $(body).addClass("card-body d-flex flex-column");

        let name = document.createElement("h6");
        name.appendChild(document.createTextNode(value.name));

        let domain = document.createElement("h5");
        domain.appendChild(document.createTextNode(value.subdomain + "." + value.domain));

        let link = document.createElement("a");
        $(link).addClass("btn btn-primary mt-auto");
        $(link).attr("href", "http://" + value.subdomain + "." + value.domain);
        $(link).attr("target", "_blank");
        link.appendChild(document.createTextNode("Go to site"));

        // Check for an application
        let appName = document.createElement("p");

        apiRequest(1, "applications/search", {vhost: value.subdomain + "." + value.domain}).done(function(json){
            if(json.length !== 0)
            {
                let appLink = document.createElement("a");
                $(appLink).attr("href", "javascript:viewApplication(" + json[0].number + ")");
                $(appLink).addClass("text-light");
                appLink.appendChild(document.createTextNode(json[0].name));

                appName.appendChild(document.createTextNode("Running "));
                appName.appendChild(appLink);
            }
        });

        body.appendChild(name);
        body.appendChild(domain);
        body.appendChild(appName);
        body.appendChild(link);

        card.appendChild(body);

        site.appendChild(card);

        container.appendChild(site);
    });
}

/**
 * Load details for the supplied application
 * @param appNumber
 */
function viewApplication(appNumber)
{
    let appModal = document.createElement("div");
    $(appModal).addClass("modal fade");
    $(appModal).attr("role", "dialog");

    let modalDialog = document.createElement("div");
    $(modalDialog).addClass("modal-dialog");

    let modalContent = document.createElement("div");
    $(modalContent).addClass("modal-content");

    let modalHeader = document.createElement("div");
    $(modalHeader).addClass("modal-header");

    let modalBody = document.createElement("div");
    $(modalBody).addClass("modal-body");

    let modalFooter = document.createElement("div");
    $(modalFooter).addClass("modal-footer");

    let closeButton = document.createElement("button");
    $(closeButton).addClass("btn btn-default");
    $(closeButton).attr("type", "button");
    $(closeButton).attr("data-dismiss", "modal");
    $(closeButton).click(function(){closeApplication(this)});
    closeButton.appendChild(document.createTextNode("Close"));
    modalFooter.appendChild(closeButton);

    apiRequest(0, "applications/" + appNumber, {}).done(function(json){
        let appTitle = document.createElement("h4");
        appTitle.appendChild(document.createTextNode(json.name));
        modalHeader.appendChild(appTitle);

        let appDescription = document.createElement("p");
        appDescription.appendChild(document.createTextNode(json.description));
        modalBody.appendChild(appDescription);

        let appPort = document.createElement("p");
        appPort.appendChild(document.createTextNode("Port " + json.port));
        modalBody.appendChild(appPort);

        let viewLink = document.createElement("a");
        $(viewLink).addClass("btn btn-primary");
        $(viewLink).attr("href", "https://webnoc.llrnetworks.com/services/applications/view?a=" + json.number);
        $(viewLink).attr("target", "_blank");
        viewLink.appendChild(document.createTextNode("View app #" + json.number + " in NetCenter"));
        modalBody.appendChild(viewLink);
    });

    modalContent.appendChild(modalHeader);
    modalContent.append(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    appModal.appendChild(modalDialog);

    document.querySelector("#container").appendChild(appModal);
    $(appModal).modal('show');
}

function closeApplication(button)
{
    setTimeout(function(){

        document.querySelector("#container").removeChild(button.parentElement.parentElement.parentElement.parentElement);

    }, 1000); // Wait for modal animation to finish
}

$(document).ready(function(){
    apiRequest(1, 'vhosts/search', {status: ['acti']}).done(function(json){
        displayActiveSites(json);
    });
});