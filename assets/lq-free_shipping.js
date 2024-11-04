(function () {
  class FreeShipping extends HTMLElement {

    constructor() {
      super();
    }
    connectedCallback() {
      this.cartTotal = (this.dataset.cartTotal) ? this.dataset.cartTotal : 0;
      this.freeShippingThreshold = (this.dataset.freeShippingThreshold) ? this.dataset.freeShippingThreshold : 0;
      this.message = (this.dataset.message) ? this.dataset.message : 0;
      this.currencySymbol = (this.dataset.currencySymbol) ? this.dataset.currencySymbol : 0;
      this.roundAmount = (this.dataset.roundAmount) ? this.dataset.roundAmount : false;;
      this.amountLeftToSpend = this.getAmountLeft();

      this.setMessage();
      this.addMessage();

    }
    disconnectedCallback() {
      if (this.querySelector('p')) {
        this.querySelector('p').remove();
      }
    }
    getAmountLeft() {
      let currencyRate = 1; // Shopify.currency.rate;

      let amountLeftToSpend = ( (this.freeShippingThreshold-(this.cartTotal * currencyRate) * 1) / 100);
      amountLeftToSpend = (Math.round(amountLeftToSpend * 100) / 100);
      amountLeftToSpend = (this.roundAmount) ? Math.round(amountLeftToSpend) : amountLeftToSpend;

      return (amountLeftToSpend <= 0) ? 0 : this.currencySymbol + amountLeftToSpend;
    }
    setMessage() {
      this.message = this.message.replace('{{ amount }}', this.amountLeftToSpend);
    }
    addMessage() {
      const node = document.createElement("p");
      node.innerHTML = this.message;
      this.prepend(node);
    }
  }
  window.customElements.define("free-shipping", FreeShipping);
})();

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    this.progress = parseInt(this.dataset.value);
  }
}

customElements.define('progress-bar', ProgressBar);