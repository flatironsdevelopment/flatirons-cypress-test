import { BasePage } from "./BasePage";

class TemplatesPage extends BasePage {
  constructor() {
    super("/account/importers");
  }
}

module.exports = new TemplatesPage();
