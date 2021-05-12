(function() {

    /* Pegar dados do usuario */
    nome = document.querySelector('#username');
    sobrenome = document.querySelector('#sobrenome');
    createUserButton = document.querySelector('#submit');
    email = document.querySelector('#email');
    dataNascimento = document.querySelector('#data');
    senha = document.querySelector('#senha');
    confirm_senha = document.querySelector('#confirm-senha');
    concordaTermos = document.querySelector('#check');

    /*Cria evento do botão para enviar dados de login*/
    createUserButton.addEventListener('click', function() {

        /* Confere se o usuario concorda com os termos de uso */
        if (concordaTermos.checked) {

            /*cria o usuario*/
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, senha.value)
                .then(function() {
                    /* Armazena dados no banco de dados */
                    firebase.database()
                        .ref('users/' + firebase.auth().currentUser.uid)
                        .set({
                            'nome': nome.value,
                            'sobrenome': sobrenome.value,
                            'email': email.value,
                            'dataNascimento': dataNascimento.value

                        })
                        .then(function() {
                            /* cria o id da seção */
                            secion = email.value.replaceAll("@", "")
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
                                })(30)

                            /* Armazena seção do usuario no firebase*/
                            firebase
                                .database()
                                .ref('sesion/' + secion)
                                .set(firebase.auth().currentUser.uid).then(function() {
                                    /* armazena a seção do usuario localmente */
                                    infoLocalUser.setSesion(secion);
                                    infoLocalUser.setEmail(email.value);

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
                })

        }

    })
})();