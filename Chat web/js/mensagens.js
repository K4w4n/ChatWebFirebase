var escreva;

window.addEventListener("load", function() {
    var contatoSelecionado;
    var numeroContatoSelecionado;
    var logic = {
        contacts: [],
        atualizeVizualContacts: function() {
            ContatosLyout = document.getElementById('contacts');

            input = document.createElement('input')
            input.setAttribute('id', 'Seacher-friend');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Search for a @friend');
            input.addEventListener('keyup', function(e) {

                var key = e.which || e.keyCode;
                if (key == 13 && this.value) {
                    logic.inicieChatCom(this.value);
                    this.value = '';
                }
            });

            ContatosLyout.innerHTML = ''
            ContatosLyout.appendChild(input);
            for (i = 0; i < this.contacts.length; i++) {
                contactName = this.contacts[i].contactName;
                ContatosLyout = document.getElementById('contacts');
                contato = document.createElement('section');
                contato.classList.add("contact-friend");
                contactName = document.createTextNode(contactName);
                contato.appendChild(contactName);
                eval(`function abraContact() { logic.trocaChat(${i});contatoSelecionado = logic.contacts[${i}]; numeroContatoSelecionado = ${i}}`);
                contato.addEventListener('click', abraContact)

                /* if (this.contacts[i].newMsg) {
                    contato.classList.add('notify');
                } */
                ContatosLyout.appendChild(contato);
            }
        },
        atualizeLogic: function() {
            for (i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].mensagens) {
                    this.contacts[i].mensagens = this.contacts[i].mensagens.sort(function(a, b) {
                        return a.dateSend > b.dateSend ? -1 : a.dateSend < b.dateSend ? 1 : 0;
                    });

                }
            }
            this.contacts = this.contacts.sort(function(a, b) {
                if (a.mensagens && b.mensagens) {
                    return (a.mensagens ? (b.mensagens ? (0) : (1)) : (b.mensagens ? (-1) : (a.mensagens[0].dateSend < b.mensagens[0].dateSend ? -1 : a.mensagens[0].dateSend > b.mensagens[0].dateSend ? 1 : 0)));
                } else if (!a.mensagens && !b.mensagens) {
                    return (a.contactName > b.contactName ? 1 : -1);
                } else if (!a.mensagens) {
                    return (-1);

                } else if (!b.mensagens) {
                    return (1);
                } else {
                    return (0);
                }
            });
        },
        atualizeVizualMsg: function(contact) {

            this.atualizeVizualContacts();
            document.getElementsByClassName('contact-friend')[contact].classList.add('selecionado');
            mensagemArea = document.getElementById('msg-camp');
            mensagemArea.innerHTML = '';
            endContact = this.contacts[contact];
            br = ('<br>')

            if (endContact.mensagens) {
                for (i = 0; i < endContact.mensagens.length; i++) {
                    mensagemSelecionada = endContact.mensagens[i];
                    dia = mensagemSelecionada.dateSend.getDate();
                    mes = mensagemSelecionada.dateSend.getMonth() + 1;
                    ano = mensagemSelecionada.dateSend.getFullYear();

                    textmsg = document.createElement('p');
                    textmsg.innerHTML = mensagemSelecionada.msgTxt.replaceAll('\n', br);

                    minutos = mensagemSelecionada.dateSend.getUTCMinutes();
                    hora = mensagemSelecionada.dateSend.getHours();

                    dataMsg = document.createElement('div');
                    dataMsg.appendChild(document.createTextNode(' ' + leftPad(hora, 2) + ':' + leftPad(minutos, 2)))
                    dataMsg.classList.add('time-msg');

                    mensagem = document.createElement('section');
                    mensagem.appendChild(textmsg);
                    mensagem.classList.add(endContact.yourNumber === mensagemSelecionada.numberSender ? 'your-msg' : 'other-msg');
                    mensagem.appendChild(dataMsg);
                    mensagem.classList.add('msg');


                    mensagemArea.appendChild(mensagem);

                    if (i === endContact.mensagens.length - 1 || (ano != endContact.mensagens[i + 1].dateSend.getFullYear() && mes != endContact.mensagens[i + 1].dateSend.getMonth() && dia != endContact.mensagens[i + 1].dateSend.getDay())) {
                        dateview = document.createElement('div');
                        dateview.classList.add('dataMsgDivision');
                        contentDateView = document.createElement('div');
                        contentDateView.appendChild(document.createTextNode(`${leftPad(dia, 2)}/${leftPad(mes, 2)}/${leftPad(ano, 4)}`));
                        dateview.appendChild(contentDateView);

                        mensagemArea.appendChild(dateview);
                    }
                }
            } else {
                dateview = document.createElement('div');
                dateview.classList.add('dataMsgDivision');
                contentDateView = document.createElement('div');
                contentDateView.appendChild(document.createTextNode('Envie uma mensagem para esse amigo'));
                dateview.appendChild(contentDateView);

                mensagemArea.appendChild(dateview);
            }
        },
        atualizecontactview: function(numeroContato) {
            document.getElementById('contact-friend-selected').innerHTML = this.contacts[numeroContato].contactName;
        },
        trocaChat: function(numeroContato) {
            document.getElementById('send-box').style.visibility = 'visible';
            contatoInfo = this.contacts[numeroContato];
            this.contacts[numeroContato].newMsg = false;
            this.atualizeLogic()
            this.atualizecontactview(numeroContato);
            this.atualizeVizualMsg(numeroContato);


        },
        inicieChatCom: function(emailFriend) {


            var dadosTemporarios;
            var usersId;

            firebase.database().ref().once('value').then((snapshot) => {
                dadosTemporarios = snapshot.val();
                usersId = Object.keys(dadosTemporarios.users)
                usersId.forEach((codidusers) => {
                    if (dadosTemporarios.users[codidusers].email.toLowerCase() === emailFriend.toLowerCase()) {

                        var novo_id_chat = firebase.database().ref().child('chats').push().key;
                        firebase
                            .database()
                            .ref('chats/' + novo_id_chat)
                            .set({
                                'mensagens': [],
                                'persons': [{
                                        'email': infoLocalUser.email.toLowerCase(),
                                        'nome': infoLocalUser.name,
                                        'newMsg': false
                                    },
                                    {
                                        'email': dadosTemporarios.users[codidusers].email.toLowerCase(),
                                        'nome': dadosTemporarios.users[codidusers].nome,
                                        'newMsg': true
                                    }
                                ]
                            }).then(() => {

                                firebase
                                    .database()
                                    .ref('sesion')
                                    .once('value')
                                    .then(snapshot => {
                                        const allsesion = snapshot.val();
                                        const idUser = allsesion[infoLocalUser.session];
                                        firebase
                                            .database()
                                            .ref('users')
                                            .once('value')
                                            .then(snapshot => {
                                                const allUsers = snapshot.val();
                                                const perfilUser = allUsers[idUser];
                                                firebase
                                                    .database()
                                                    .ref('users/' + idUser + '/yourchats')
                                                    .push()
                                                    .set({ 'idChat': novo_id_chat, 'yourNumber': 0 })

                                                firebase
                                                    .database()
                                                    .ref('users/' + codidusers + '/yourchats')
                                                    .push()
                                                    .set({ 'idChat': novo_id_chat, 'yourNumber': 1 })

                                            })


                                    })
                                logic.atualizeLogic();
                                logic.atualizeVizualContacts();


                            })
                    }

                })
            })


        },
        sendMsg: (msgcontent) => {
            const objMensagem = {
                numberSender: contatoSelecionado.yourNumber,
                msgTxt: msgcontent,
                dateSend: new Date() + ''
            }
            firebase
                .database()
                .ref("chats/" + contatoSelecionado.idChat + '/mensagens')
                .push()
                .set(objMensagem).then(() => {
                    document.querySelector('.selecionado').click();
                    firebase
                        .database()
                        .ref('chats/' + contatoSelecionado.idChat + '/persons/' + contatoSelecionado.yourNumber ? 0 : 1)
                        .set(true)
                });
        },
        carregarContatosandMsg: function() {

            this.contacts = [];

            firebase.database()
                .ref('sesion/' + infoLocalUser.session)
                .once('value', callBack => {

                    const idUser = callBack.val();
                    firebase
                        .database()
                        .ref('users/' + idUser + '/yourchats')
                        .on('child_added', callBack => {

                            const IdChatUnico = callBack.val()
                            firebase
                                .database()
                                .ref('chats/' + IdChatUnico.idChat + '/persons')
                                .once('value', callBack => {

                                    const pessoasDoChat = callBack.val();
                                    const chatParaAdicionar = {
                                        contactName: pessoasDoChat[IdChatUnico.yourNumber ? 0 : 1].nome,
                                        idChat: IdChatUnico.idChat,
                                        yourNumber: IdChatUnico.yourNumber,
                                        email: pessoasDoChat[IdChatUnico.yourNumber ? 0 : 1].email,
                                        newMsg: pessoasDoChat[IdChatUnico.yourNumber ? 0 : 1].newMsg,
                                        mensagens: []
                                    };
                                    this.contacts.push(chatParaAdicionar);
                                    this.atualizeLogic()
                                    this.atualizeVizualContacts()
                                    firebase
                                        .database()
                                        .ref('chats/' + IdChatUnico.idChat + '/mensagens')
                                        .on('child_added', callBack => {

                                            const mensagemPessoaDoChat = callBack.val();
                                            chatParaAdicionar.mensagens.push({
                                                dateSend: new Date(mensagemPessoaDoChat.dateSend),
                                                msgTxt: mensagemPessoaDoChat.msgTxt,
                                                numberSender: mensagemPessoaDoChat.numberSender,
                                            })
                                            document.querySelector('.selecionado').click()
                                        })
                                })

                        })

                })



        }
    }
    logic.carregarContatosandMsg()

    function desenhe1Contato(contactName) {
        ContatosLyout = document.getElementById('contacts');
        contato = document.createElement('section');
        contato.classList.add("contact-friend");
        contactName = document.createTextNode(contactName);
        contato.appendChild(contactName);

        htmltemporario = contato;
        ContatosLyout.appendChild(htmltemporario);
    }

    function desenheMuitosContatos(ListcontactName) {
        for (i = 0; i < ListcontactName.length; i++) {
            desenhe1Contato(ListcontactName[i]);
        }
    }

    function leftPad(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    };
    document.addEventListener("load", function() {
        logic.atualizeLogic();
        logic.atualizeVizualContacts();
    });

    function createMathFunction(formula) {
        parametros = [];
        eval(
            `
            function funcaoAnonima(A, B, C, D, E, F, G){
                return(${formula});
            }
            `
        )
        return (funcaoAnonima);
    }


    interface = {
        contatos: {
            addContato: function(contatoUnico) {
                logic.contacts.push({ contactName: contatoUnico })
                logic.atualizeLogic();
                logic.atualizeVizualContacts();
            },
            addMultContatos: function(contatoList) {

            },
            addMensagem: function() {

            }
        }

    }

    logic.atualizeLogic();
    logic.atualizeVizualContacts();

    document.querySelector('#sair').addEventListener('click', function() {


        firebase.database().ref('sesion/' + infoLocalUser.session).remove().then(function() {
            infoLocalUser.deletInfo();
            window.location.href = 'login.html';
        });


    });
    document.querySelector('#button-send').addEventListener('click', () => {
        const elementMsg = document.querySelector('#typing-field');
        const msgcontent = elementMsg.value;
        elementMsg.value = '';
        logic.sendMsg(msgcontent);


    })

})