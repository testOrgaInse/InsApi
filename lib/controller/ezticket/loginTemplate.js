export const translation = {
  fr: {
    login: "identifiant",
    password: "mot de passe",
    title: "Ressources numériques",
    info:
      "Accès réservé aux ayants droits de l'Inserm. <br>Merci de vous identifier.",
    chooseMode: "S'identifier",
    connection: "Connexion",
    janus: "se connecter avec janus",
    informationJanus:
      "Pour obtenir vos identifiants de messagerie Inserm, veuillez contacter votre <a href='https://intranet.inserm.fr/Pages/annuaire-rsi.aspx' target='_blank'>Responsable du système d'information</a>",
    labintelAccount: "Via vos identifiants de messagerie Inserm",
    inistAccount: "Via votre ancien code d'accès BiblioInserm",
    contact: "nous contacter",
    janusExplanation:
      "Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
    401: `L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail, veuillez essayer à nouveau en majuscule sans espace.
Si le problème persiste, n'hésitez pas à contacter assistance-portail@inist.fr`
  },
  en: {
    login: "login",
    password: "password",
    title: "Digital ressources",
    info:
      "Access is reserver for Inserm right holders. Please identify yourself.",
    chooseMode: "Sign in",
    connection: "Connection",
    janus: "connect with janus",
    labintelAccount: "Via Inserm identity manager.",
    inistAccount: "Via your old BiblioInserm access code.",
    contact: "contact us",
    janusExplanation:
      "personal account for all CNRS services Agate, Simbad ...",
    401: `The username / password is wrong. Please try again (in capital letters without spaces).
If the problem persists, do not hesitate to contact assistance-portail@inist.fr`
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
p {
    margin: 4px 0 10px;
}
.modal-header,
p > a {
    color: red;
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
    background-color: #5da6e4;
    border-color: #5da6e4;
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
