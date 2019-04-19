export class Template {
  template: {
    method: string;
    url: string;
    options?: object;
    body?: object | string;
    query?: object| string;
  };
  showToken?: boolean = false;
  showAuth?: boolean = false;
  functions: object;
}

export class RequestTempalte {
  constructor() {}

  post(url: string, data: object | string | null, functions: object) {
    let template = new Template();
    template.template = {
      method: 'POST',
      url: url,
    };

    if (data != null) {
      template.template.body = data;
    }

    template.functions = functions;

    return template;
  }

  get(url: string, data: object | string | null , functions: object) {
    let template = new Template();
    template.template = {
      method: 'GET',
      url: url,
    };

    if (data != null) {
      template.template.query = data;
    }
    template.functions = functions;
    return template;
  }
}
