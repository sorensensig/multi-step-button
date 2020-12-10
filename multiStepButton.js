class MultiStepButton {
  constructor(injectNode, payload) {
    this.state.injectNode = injectNode;
    this.state.content = payload;
    this.state.stepContent = payload[0];
    this.state.parentNode = this.buildParentNode(injectNode);
    this.nextStep(this.state.parentNode);
  }
  state = {
    injectNode: null,
    parentNode: null,
    containerNodes: [],
    content: {},
    stepCounter: -1,
    stepContent: {},
    choices: []
  }
  getStepContent() {
    return this.state.stepContent;
  }
  getStepCounter() {
    return this.state.stepCounter;
  }
  addContainerNode(node) {
    this.state.containerNodes.push(node);
  }
  getContainerNode(index) {
    return this.state.containerNodes[index];
  }
  clearContainerNodes() {
    this.state.containerNodes = [];
  }
  incrementCounter() {
    this.state.stepCounter++;
  }
  updateChoices(choice) {
    this.state.choices.push(choice);
  }
  updateStepContent() {
    this.state.stepContent = this.state.content[this.getStepCounter()];
  }
  buildParentNode(injectNode) {
    let container = document.createElement('div');
    container.classList.add('msb-container');
    injectNode.appendChild(container);
    return container;
  }
  buildContainerNode(parentNode) {
    const node = document.createElement('div');
    this.addContainerNode(node);
    parentNode.appendChild(node);
    return node;
  }
  buildIconNode(container) {
    container.appendChild(document.createElement('span'));
  }
  buildParagraphNode(parentNode, container, content) {
    let paragraphNode = document.createElement('p');
    paragraphNode.innerHTML = content.text;
    container.appendChild(paragraphNode);
    container.addEventListener('click', () => {
      if (this.getStepCounter() > 0 ) this.updateChoices(content.text);
      this.nextStep(parentNode);
    });
  }
  buildInputNode(container, content) {
    let node = document.createElement('div');
    content.label = this.state.choices[0];
    node.setAttribute('data-label-content', content.label);
    let inputNode = document.createElement('input');
    node.appendChild(inputNode);
    inputNode.addEventListener('focus', (event) => {
      node.style.setProperty('--input-label-margin', '-8px');
      node.style.setProperty('--input-font-size', '8px');
    });
    inputNode.addEventListener('blur', (event) => {
      if (event.target.value === "") {
        node.style.setProperty('--input-font-size', '14px');
        node.style.setProperty('--input-label-margin', '4px');
      }
    });
    container.appendChild(node);
  }
  createNodes(parentNode, content) {
    for(let nodeContent of content) {
      let container = this.buildContainerNode(parentNode);
      this.buildIconNode(container);
      (( this.getStepCounter() < 3 ? this.buildParagraphNode(parentNode, container, nodeContent) : this.buildInputNode(container, nodeContent) ))
    }
  }
  destroyNodes(parentNode) {
    this.clearContainerNodes();
    while(parentNode.firstChild) {
      parentNode.lastChild.removeEventListener('click', this.nextStep);
      parentNode.removeChild(parentNode.lastChild);
    }
  }
  nextStep(parentNode) {
    this.incrementCounter();
    this.updateStepContent();
    this.destroyNodes(parentNode);
    this.createNodes(parentNode, this.getStepContent());
  }
}

export { MultiStepButton };