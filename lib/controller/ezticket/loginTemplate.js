export const translation = {
  fr: {
    login: "identifiant",
    password: "mot de passe",
    title: "Ressources numériques",
    info:
      "L'accès est réservé aux ayants droit de l'Inserm. <br>Merci de vous identifier.",
    chooseMode: "S'identifier",
    connection: "Connexion",
    janus: "se connecter avec janus",
    informationJanus:
      "Pour obtenir vos identifiants de messagerie Inserm, veuillez contacter votre <a href='https://intranet.inserm.fr/Pages/annuaire-rsi.aspx' target='_blank'>Responsable du système d'information</a>",
    labintelAccount: "<i>via</i> vos identifiants de messagerie Inserm",
    inistAccount: "<i>via</i> votre ancien code d'accès BiblioInserm",
    contact: "nous contacter",
    janusExplanation:
      "Saisir l’adresse et le mot de passe utilisés pour accéder à la messagerie et autres services Inserm (Intranet, RH…)",
    401: `Votre connexion est refusée. Veuillez saisir à nouveau vos identifiant et mot de passe en majuscule et sans espace. 
    Si le problème persiste, n’hésitez pas à contacter biblioinserm@inserm.fr`
  },
  en: {
    login: "login",
    password: "password",
    title: "Digital resources",
    info:
      "Access is reserver for Inserm right holders. <br>Please identify yourself.",
    chooseMode: "Sign in",
    connection: "Connection",
    janus: "connect with janus",
    labintelAccount: "<i>via</i> Inserm identity manager.",
    inistAccount: "<i>via</i> your old BiblioInserm access code.",
    contact: "contact us",
    janusExplanation:
      "Enter the email address and password used for the Inserm email account and the other e-services (Intranet, HR…)",
    401: `Your connection is refused. Please enter your username and password again, in capital letters and without spaces. 
    If the problem persists, please do not hesitate to contact biblioinserm@inserm.fr`
  }
};

export default (language, error) => {
  const text = translation[language];

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
.tooltip {
    left: 33%;
    right: 33%;
    display: none;
}
.modal-dialog {
    color: #056180;
}
p {
    margin: 4px 0 10px;
}
.modal-header,
p > a {
    color: #e44211;
}
.btn, input, .modal-content, .panel {
    border-radius: 0!important;
}
.panel-title {
    cursor: pointer;
}
.panel-title:hover{
    text-decoration: underline;
}
.logo {
    width: 150px;
    position: absolute;
    right: 10px;
    top: 16px;
}
.choose {
    font-weight: bold;
}
.ask-account {
    float: right;
}
.btn-primary {
    background-color: #66a8be;
    border-color: #66a8be;
}
.modal-header {
    font-size: 18px;
}
    </style>
</head>
<body>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">${
              text.title
            }<img class="logo" src="./bibinserm.png"/></div>
            <div class="modal-body">
                ${
                  error
                    ? `<div class="alert alert-danger" role="alert">
                        <p>${text[error]}</p>
                    </div>`
                    : ""
                }
                <p><small>${text.info}</small></p>
                <p class="choose">${text.chooseMode}</p>
                <button id="janus_connect" type="button" class="janus btn btn-primary btn-block">
                    <span class="fa fa-sign-in"></span> <span class="text">
                        ${text.labintelAccount}
                    </span>
                </button>
                <div id="tooltip" class="tooltip bottom" role="tooltip">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">${text.janusExplanation}</div>
                </div>
                <p>${text.informationJanus}</p>
                <br>
                <button id="bibapi_toggle" type="button" class="inist btn btn-primary btn-block">
                    <span class="fa fa-sign-in"></span> <span class="text">
                        ${text.inistAccount}
                    </span>
                </button>
                <div class="bibapi panel">
                    <div id="bibapi-panel" class="panel-collapse collapse" >
                        <div class="panel-body">
                            <form  class="form-signin" role="form" method="post">
                                <div id="error"></div>
                                <div class="form-group">
                                    <label class="control-label" for="username">${
                                      text.login
                                    }</label>
                                    <input id="username" class="form-control" name="username" type="text" required="true">
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="password">${
                                      text.password
                                    }</label>
                                    <input id="password" class="form-control" name="password" type="password" required="true">
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary btn-block">${
                                      text.connection
                                    }</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="mailto:biblioinserm@inserm.fr">${text.contact}</a>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        (function () {
            document.getElementById("janus_connect").onclick = function() {
                document.location.href =(
                    window.location.href.replace(new RegExp('/ezticket/login.*'), '') +
                    '/ebsco/login_renater/?origin=' +
                    encodeURIComponent(window.location.href.replace('/login', ''))
                );
            };

            var tooltip = document.getElementById("tooltip");
            var janusButton = document.getElementById("janus_connect");
            janusButton.addEventListener('mouseenter', function ()  {
                tooltip.style.opacity = 1;
                tooltip.style.display = 'block';
            });
            janusButton.addEventListener('mouseleave', function ()  {
                tooltip.style.opacity = 0;
                tooltip.style.display = 'none';
            });

            var bibapiButton = document.getElementById("bibapi_toggle");
            var panel = document.getElementById("bibapi-panel");
            bibapiButton.onclick = function() {
                panel.classList.toggle('in');
            };
        })()
    </script>
</body>
</html>`;
};
