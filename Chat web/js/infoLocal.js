class infoLocal {
    constructor() {
        if (!localStorage.infoChatweb) {
            localStorage.setItem("infoChatweb", JSON.stringify({}));
        }
        let ___dados = JSON.parse(localStorage.infoChatweb);
        this.session = ___dados.session;
        this.email = ___dados.email;
        this.name = ___dados.name;
    }
    setSesion(newSesion) {
        localStorage.infoChatweb = JSON.stringify({ 'session': newSesion, 'email': this.email, 'name': this.name });
        this.session = newSesion;
    }
    setEmail(newEmail) {
        localStorage.infoChatweb = JSON.stringify({ 'session': this.session, 'email': newEmail, 'name': this.name });
        this.email = newEmail;
    }
    setName(newName) {
        this.name = newName;
        localStorage.infoChatweb = JSON.stringify({ 'session': this.session, 'email': this.email, 'name': this.name });
    }
    deletInfo() {
        localStorage.removeItem('infoChatweb');
    }
}
var infoLocalUser = new infoLocal();