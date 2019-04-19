import {Template} from './_requestTemplate';
import {clientId, secret} from '../config.json';

const bodyDefault = {
  client_id: clientId,
  secret: secret,
};

export class OperationTemplates {
  template: object;
  functions: object;
}

export class Config {
  connector: string;
  options?: object;
  operations: object;
}

export class RequestConfig {
  private config: Config;

  public headers = {
    accept: 'application/json',
    'content-type': 'application/json',
  };

  constructor(private token: string | null = null) {
    this.config = {
      connector: 'rest',

      operations: [],
    };
  }

  secretRequest(operations: Template[]) {
    let newOperations: OperationTemplates[] = [];
    operations.map(item => {
      if (typeof item.template.body === 'object') {
        item.template.body = {...item.template.body, ...bodyDefault};
      }
      
      let newHeaders = Object.assign({}, this.headers) 

      if (item.showAuth) {
        Object.assign(newHeaders, {
          'X-Authorization': '{auth}',
        });
      }

      if (item.showToken) {
        Object.assign(newHeaders, {
          Authorization: 'Bearer {token}',
        });
      }

      item.template.options = {
        headers: newHeaders,
      };

      console.log("this.headers", this.headers)
      console.log("new headers", newHeaders)

      if (typeof item.template.query === 'object') {
        item.template.query = {...item.template.query, ...bodyDefault};
      }

      newOperations.push({
        template: {...item.template},
        functions: {...item.functions},
      });
    });

    this.config.operations = [...newOperations];

    return this.config;
  }
}
