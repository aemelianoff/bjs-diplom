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
    getStocks((err, data) => {
        if(err) {
                console.error('Error during getting stocks');
        } else {
               let currency = data   
           // console.log(currency);
        }
    });  
const Ivan = new Profile({
                username: 'ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'ivanspass',
});
Ivan.createUser((err, data) => {
    if(err) {
            console.error(`Error during creating ivan`);
    } else {
            console.log(`${Ivan.username} is created!`);
   }
});
Ivan.performLogin((err, data) => {
    if(err) {
            console.error(`Error during authorizing ivan`);
    } else {
           console.log(`${Ivan.username} is authorized!`);
}
});
Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
    if (err) {
             console.error('Error during adding money to Ivan');
    } else {
            console.log(`Added 100 RUB to ${Ivan.username}`);
   }
});        
}
main();
