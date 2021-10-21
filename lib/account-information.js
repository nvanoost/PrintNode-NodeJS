/** @mixin Account */
var Account = {

  /** Fetch metadata about PrintNode account */
  whoami: function () {
    return this._getJSON('whoami');
  },

  /** Fetch print credits available to PrintNode account */
  credits: function () {
    return this._getJSON('credits');
  },

  /**
   * Create a child account to the PrintNode main account
   * @param account
   */
  createChildAccount: function (account) {
    if(!account.account) {
      throw new Error('Must provide a "account" object for a child account');
    }
    if(!account.account.creatorRef) {
      throw new Error('Must provide a "creatorRef" for a child account');
    }
    if(!account.account.email) {
      throw new Error('Must provide an "email" for a child account');
    }
    if(!account.account.password) {
      throw new Error('Must provide a "password" for a child account');
    }
    if(account.account.password.length < 8) {
      throw new Error('Must provide a "password" with a minimum length of 8 chars for a child account');
    }

    //Since firstName and lastName are deprecated but still required we overwrite their values to '-' (according to the docs)
    account.account.firstname = '-'
    account.account.lastname = '-'


    return this._postJSON('account', account)
  },

  fetchClientKey: function(uuid, edition, version) {
    if(!uuid) {
      throw new Error('Must provide a "uuid" for fetching a client key');

    }
    if(!edition) {
      throw new Error('Must provide an "edition" for fetching a client key');

    }
    if(!version) {
      throw new Error('Must provide a "version" for fetching a client key');
    }

    return this._getJSON('client/key/' + uuid + '?edition=' + edition + '&version=' + version)
  }

};

module.exports = Account;
  