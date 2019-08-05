class Profile {
constructor({ username, name: {firstName, lastName}, password }) {
    this.username = username;
    this.name = {
        firstName, 
        lastName
        };
    this.password = password;
  }

  createUser(callback) {
        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
              console.log(`Creating user ${this.username}.`);
              callback(err, data);
        });
    }

    performLogin(callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
        });
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

     convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
    console.log(`Getting stocks info`);
    callback(err, data);
    });
}


function main() {
   const Ivan = new Profile({
                username: 'ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'ivanspass',
});
const Navi = new Profile({
                username: 'navi',
                name: { firstName: 'navi', lastName: 'Vehsynrehc' },
                password: 'navispass',
});

getStocks((err, data) => {
    if(err) {
        console.error('Error during getting stocks');
    } else {
        let currencyConvert = data   
        //console.log(currencyConvert);
    
    Ivan.createUser((err, data) => {
        if(err) {
            console.error(`Error during creating ivan`);
        } else {
            console.log(`${Ivan.username} is created!`);
            
            Navi.createUser((err, data) => {
                if(err) {
                    console.error(`Error during creating Navi`);
                    } else {
                        console.log(`${Navi.username} is created!`);
                        
                        Ivan.performLogin((err, data) => {
                            if(err) {
                                console.error(`Error during authorizing Ivan`);
                                } else {
                                    console.log(`${Ivan.username} is authorized!`);
                                    
                                    Ivan.addMoney({ currency: 'RUB', amount: 1000 }, (err, data) => {
                                        if (err) {
                                            console.error('Error during adding money to Ivan');
                                        } else {
                                            const converted = currencyConvert[99].RUB_NETCOIN * data.wallet.RUB;
                                            //console.log(converted);
                                            console.log(`Added 1000 RUB to ${Ivan.username}`);
                                            
                                            Ivan.convertMoney({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: converted}, (err, data) => {
                                                if (err) {
                                                    console.error('Error during converting money');
                                                } else {
                                                        console.log(`Converted to coins`, data);
                                                        const transfer = data.wallet.NETCOIN;
                                                        Ivan.transferMoney({to: Navi.username, amount: transfer}, (err, data) => {
                                                            if(err) {
                                                                console.error('Error during transfer money');
                                                            } else {
                                                                console.log(`Navi has got ${transfer} NETCOINS`);
                                                        }});
                                            }}); 
                                    }});                                  
                        }});
            }});
    }});
}});
}
main();
