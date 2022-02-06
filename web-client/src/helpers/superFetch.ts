class SuperFetch {
  fetchObj: any;
  methods: Array<string>;
  constructor() {
    this.fetchObj = {};
    this.methods = ["get", "post", "put", "patch", "delete"];
    this.bindMethod();
  }

  bindMethod() {
    this.methods.forEach((method) => {
      this.fetchObj[method] = this.fetch.bind(this, method);
    });
  }

  async fetch(method: string, path: string, bodyObj?: any) {
    try {
      const response = await fetch(`${path}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method,
        body: method !== "get" ? JSON.stringify(bodyObj) : undefined,
      });

      const json = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("isLoggedIn");
        return json;
      } else if (response.status === 403) {
        return json;
      } else {
        return json;
      }
    } catch (error) {
      throw error;
    }
  }
  get instance() {
    return this.fetchObj;
  }
}

export default new SuperFetch().instance;
