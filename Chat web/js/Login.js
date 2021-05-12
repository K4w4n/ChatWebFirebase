(function() {
    let secion;
    botaoEnviar = document.querySelector('#submit');
    botaoEnviar.addEventListener('click', function() {
        let email = document.getElementById('email').value;
        let senha = document.getElementById('password').value;


        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function(user) {
                /* cria o id da seção */
                secion = user.user.email.replaceAll("@", "")
                    .replaceAll(".", "")
                    .replaceAll("#", "")
                    .replaceAll("$", "")
                    .replaceAll("[", "")
                    .replaceAll("]", "") +
                    (function(tamanho, caracteres) {
                        if (!caracteres) {
                            caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
                        }
                        stringReturn = ''
                        for (i = 0; i < tamanho; i++) {
                            newChar = caracteres[Math.round(Math.random() * caracteres.length - 1)];
                            if (newChar === undefined) {
                                newChar = '';
                                i--;
                            }
                            stringReturn += newChar;
                        }
                        return (stringReturn);
                    })(30);
                /* Armazena seção do usuario no firebase*/
                firebase
                    .database()
                    .ref('sesion/' + secion)
                    .set(firebase.auth().currentUser.uid).then(function() {
                        /* armazena a seção do usuario localmente */
                        infoLocalUser.setSesion(secion);
                        infoLocalUser.setEmail(email);
                        firebase
                            .database()
                            .ref('users/' + firebase.auth().currentUser.uid)
                            .once('value')
                            .then((callBack) => {
                                infoLocalUser.setName(callBack.val().nome);
                                /* Redireciona para "mensagens" */
                                window.location.href = 'mensagens.html'
                            });


                    });

            })
            /* let usuario = {
                'email': email,
                'password': senha
    
            } */
    });
})()




function mostrarSenha() {
    let tipo = document.getElementById("password");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }

}