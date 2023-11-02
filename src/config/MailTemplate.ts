import Handlebars from 'handlebars';
import fs from 'fs/promises';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export class MailTemplate {
  public async parse({ template, variables }: IParseMailTemplate) {
    const contentTemplate = await fs.readFile(template, { encoding: 'utf-8' });
    const parseTemplate = Handlebars.compile(contentTemplate);
    return parseTemplate(variables);
  }
}
