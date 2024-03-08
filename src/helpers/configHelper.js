export default class configHelper {
  static instance;

  customerConfigs = [];

  roles = [];

  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new configHelper();
    }

    return this.instance;
  }

  setCustomerConfigs(customerConfigs) {
    this.customerConfigs = customerConfigs;
  }

  setRoles(roles) {
    this.roles = roles;
  }
}
