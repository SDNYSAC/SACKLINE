(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <style></style>
    <div id="root" style="width: 100%; height: 100%;">
      <iframe id="iframe" 
        style="width: 100%; height: 100%; border: none;"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      >
      </iframe>
    </div>
  `

  class StockWebPage extends HTMLElement {
    constructor () {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
    }

    onCustomWidgetAfterUpdate (changedProps) {
      if ('src' in changedProps && changedProps.src !== undefined) {
        const iframe = this.shadowRoot.getElementById('iframe')
        iframe.src = changedProps.src
      }
    }

    setSrc (src) {
      const iframe = this.shadowRoot.getElementById('iframe')
      if (iframe) {
        iframe.src = src
      }
    }

    dispose () {
      const iframe = this.shadowRoot.getElementById('iframe')
      if (iframe) {
        if (iframe.contentWindow && iframe.contentWindow.onunload) {
          iframe.contentWindow.onunload()
        }
        iframe.src = 'about:blank'
      }
    }
  }

  customElements.define('com-sap-stockwebpage', StockWebPage)
})()
