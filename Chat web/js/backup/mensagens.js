/* firebase.
database()
    .ref('users/Tge6YyqHpIMDPKdzbQGeBToyorv2/yourChats')
    .set([{
        'chatId': 'dfgdfgdfg',
        'yourNumber': 0
    }]);
firebase
    .database()
    .ref('chats')
    .push()
    .set({
        'mensagens': [{
            'text': 'Olá mundo',
            'dataSend': new Date('05/06/2000'),
            'senderNumber': 0,
            'seenBy': [1]
        }],
        'persons': [{ 'name': 'Ronaldo' }]
    }) */

var contatoSelecionado;
window.addEventListener("load", function() {

    var logic = {
        contacts: [{
                contactName: 'josé',
                idChat: '',
                yourNumber: 0,
                email: '',
                newMsg: true,
                mensagens: [{
                    sender: 'kawan',
                    msgTxt: 'oi, isso é uma conversa demonstrativa',
                    dateSend: new Date('03/17/2021 00:01:01')
                }, {
                    sender: 'josé',
                    msgTxt: 'Não quero participar disso, se funcionasse eu te bloquearia...',
                    dateSend: new Date('03/17/2021 00:01:02')
                }, {
                    sender: 'josé',
                    msgTxt: 'Mas fala mais...',
                    dateSend: new Date('03/17/2021 00:01:03')
                }, {
                    sender: 'kawan',
                    msgTxt: 'Agora perdeu a graça... tchau.\n Não me ligue novamente',
                    dateSend: new Date('03/17/2021 00:01:04')
                }]
            }, {
                contactName: 'Robot',
                newMsg: false,
                yourNumber: 0,
                mensagens: [{
                    sender: 'Robot',
                    msgTxt: 'Olá',
                    dateSend: new Date('03/17/2022 00:01:01')
                }, {
                    sender: 'Robot',
                    msgTxt: 'Seja bem vindo ao seu site de mensagens favorito!',
                    dateSend: new Date('03/17/2022 00:01:02')
                }, {
                    sender: 'Robot',
                    msgTxt: 'Se divirta!',
                    dateSend: new Date('03/17/2022 00:01:03')
                }, {
                    sender: 'Robot',
                    msgTxt: 'E qualquer coisa é só chamar!',
                    dateSend: new Date('03/17/2022 00:01:04')
                }]
            },
            {

                contactName: 'carlos',
                yourNumber: 1,
                mensagens: [{
                    sender: 'carlos',
                    msgTxt: '*',
                    dateSend: new Date('01/17/2021 00:01')
                }, {
                    sender: 'carlos',
                    msgTxt: '**',
                    dateSend: new Date('01/17/2021 00:02')
                }, {
                    sender: 'carlos',
                    msgTxt: '***',
                    dateSend: new Date('01/17/2021 00:03')
                }, {
                    sender: 'carlos',
                    msgTxt: '****',
                    dateSend: new Date('01/17/2021 00:09')
                }, {
                    sender: 'carlos',
                    msgTxt: '*****',
                    dateSend: new Date('01/17/2021 00:18')
                }, {
                    sender: 'carlos',
                    msgTxt: '******',
                    dateSend: new Date('01/17/2021 01:00')
                }, {
                    sender: 'carlos',
                    msgTxt: '*******',
                    dateSend: new Date('01/17/2021 12:01')
                }, {
                    sender: 'carlos',
                    msgTxt: '********',
                    dateSend: new Date('01/17/2021 12:11')
                }, {
                    sender: 'carlos',
                    msgTxt: '*********',
                    dateSend: new Date('01/17/2021 12:13')
                }, {
                    sender: 'carlos',
                    msgTxt: '**********',
                    dateSend: new Date('01/17/2021 12:13:01')
                }, {
                    sender: 'carlos',
                    msgTxt: 'Desculpe, estava testando algo...\n essas quebras de linha...\n são incriveis msm em?\n .\n.\n.\n',
                    dateSend: new Date('01/25/2050 00:02:00')
                }]
            },
            {
                contactName: 'antonio',
                yourNumber: 1,
                mensagens: [{
                    sender: 'carlos',
                    msgTxt: 'void...',
                    dateSend: new Date('02/17/2021 00:01')
                }]
            },
            {
                contactName: 'Mario',
                yourNumber: 0
            }
        ],
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
                eval(`function abraContact() { logic.trocaChat(${i});contatoSelecionado = logic.contacts[${i}];}`);
                contato.addEventListener('click', abraContact)

                if (this.contacts[i].newMsg) {
                    contato.classList.add('notify');
                }
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
                /* chave = (a.mensagens) ? (b.mensagens ? (a.mensagens[0].dateSend > b.mensagens[0].dateSend ? -1 : a.mensagens[0].dateSend > b.mensagens[0].dateSend ? 1 : 0) : ()) : ();
                return a.mensagens[0].dateSend > b.mensagens[0].dateSend ? -1 : a.mensagens[0].dateSend < b.mensagens[0].dateSend ? 1 : 0; */
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

                    hora = mensagemSelecionada.dateSend.getUTCMinutes();
                    minutos = mensagemSelecionada.dateSend.getHours();

                    dataMsg = document.createElement('div');
                    dataMsg.appendChild(document.createTextNode(' ' + leftPad(hora, 2) + ':' + leftPad(minutos, 2)))
                    dataMsg.classList.add('time-msg');

                    mensagem = document.createElement('section');
                    mensagem.appendChild(textmsg);
                    mensagem.classList.add(mensagemSelecionada.sender == endContact.contactName ? 'other-msg' : 'your-msg');
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

            /* alert('Com isso eu testo se o metodo esta sendo chamado') */
            var dadosTemporarios;
            var usersId;

            firebase.database().ref().once('value').then((snapshot) => {
                dadosTemporarios = snapshot.val();
                usersId = Object.keys(dadosTemporarios.users)
                usersId.forEach((codidusers) => {
                    if (dadosTemporarios.users[codidusers].email.toLowerCase() === emailFriend.toLowerCase()) {
                        /* alert('Com isso eu testo se o primeiro if esta sendo reconhecido'); */
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
                                /* console.log(infoLocalUser) */
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

                                /* firebase.database().ref('').push().set */
                                /* alert('Com isso eu testo se o metodo then esta funcionando'); */
                                logic.contacts.push({ 'contactName': dadosTemporarios.users[codidusers].nome, 'newMsg': true, 'idChat': novo_id_chat, 'yourNumber': 0 });
                                logic.atualizeLogic();
                                logic.atualizeVizualContacts();


                            })
                    }

                })
            })


        },
        sendMsg: (msgcontent) => {
            const objMensagem = {
                numberSender: contatoSelecionado.yourNumber, //pegar esse numero de algum lugar
                msgTxt: msgcontent,
                dateSend: new Date() + ''
            }
            console.log(objMensagem);
            console.log(contatoSelecionado.idChat);
            firebase
                .database()
                .ref("chats/" + contatoSelecionado.idChat + '/mensagens')
                .push()
                .set(objMensagem);

            /* firebase.database()
                .ref('chats/')
                .set({
                    sender: 0,
                    msgTxt: msgcontent,
                    dateSend: new Date()

                }) */
        },
        carregarContatosandMsg: function() {
            this.contacts = [];
            firebase.database().ref('sesion/' + infoLocalUser.session).once('value', (callBack) => {
                    const idUser = callBack.val()
                    firebase.database()
                        .ref('users/' + idUser + '/yourchats')
                        .once('value', callBack => {
                            const allChats = Object.values(callBack.val()); //cria um array com todos os endereços dos chats
                            /* console.log(allChats) */
                            allChats.forEach(chatSelecionado => {
                                firebase
                                    .database()
                                    .ref('chats/' + chatSelecionado.idChat)
                                    .once('value', callBack => {
                                        const chatBruto = callBack.val();
                                        const mensagensBrutas = Object.values(chatBruto.mensagens);
                                        const mensagensFormatadas = [];
                                        mensagensBrutas.forEach(callBack => {
                                            mensagensFormatadas.push({
                                                dateSend: new Date(callBack.dateSend),
                                                msgTxt: callBack.msgTxt,
                                                numberSender: callBack.numberSender,
                                            })
                                        })
                                        const chatFormatado = {
                                            contactName: chatBruto.persons[chatSelecionado.yourNumber ? 0 : 1].nome,
                                            idChat: chatSelecionado.idChat,
                                            yourNumber: chatSelecionado.yourNumber,
                                            email: chatBruto.persons[chatSelecionado.yourNumber ? 0 : 1].email,
                                            newMsg: chatBruto.persons[chatSelecionado.yourNumber].newMsg,
                                            mensagens: mensagensFormatadas
                                        }
                                        this.contacts.push(chatFormatado);
                                        this.atualizeLogic();
                                        this.atualizeVizualContacts()
                                        console.log(this.contacts)
                                            /* logic
                                                .contacts
                                                .push(chatFormatado); */
                                    })
                                    /* chatSelecionado.idChat
                                    chatSelecionado.yourNumber */
                                    /*  console.log(chatSelecionado);
                                     console.log(callBack).val(); */
                                    /* console.log(chatsCarregados); */

                            })

                        });
                })
                /* this.contacts = [];
                var contatoModel = {
                    contactName: 'vazio',
                    idChat: 'vazio',
                    yourNumber: 0,
                    email: 'vazio',
                    newMsg: false,
                    mensagens: []
                }

                var msgModel = {
                    numberSender: 0,
                    msgTxt: 'vazio',
                    dateSend: new Date()
                }
                for (i = 0; i < dadosContatos.length; i++) {
                    contatoModel['contactName'] = '';
                    contatoModel['idChat'] = '';
                    contatoModel['yourNumber'] = '';
                    contatoModel['email'] = '';
                    contatoModel['newMsg'] = '';
                    for (j = 0; j < dadosContatos[i].mensagens.length; j++) {
                        contatoModel.mensagens.push({
                            numberSender: 0,
                            msgTxt: 'vazio',
                            dateSend: new Date()
                        });
                    }
                } */



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
        //str.replace(/[^a]/g, "").length
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