class TodoistTaskList extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.title;
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';

      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const hasstasksList = hass.states[entityId].attributes.all_tasks;

    const stateStr = state ? state.state : 'unavailable';

    this.splitTasks(hasstasksList)
    this.updateHtml(this.TodoistTaskList)
  }

  splitTasks(tasksList){
    let splitTasks;
    splitTasks = tasksList.toString().split(",");

    return this.TodoistTaskList= splitTasks
  }

  formatTask(task){
    this.content.innerHTML += `<div class=task>${task}</div>`;
  }

  updateHtml(tasksList) {
      this.content.innerHTML = `
        <style>
          .task {
            margin-bottom: 10px;
            color: var(--primary-color);
            font: "var(--primary-font-family)";
        </style>
      `;

      tasksList.forEach((task) => {
        document.innerHTML = this.formatTask(task);
      });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

}

customElements.define('todoist-task-list', TodoistTaskList);