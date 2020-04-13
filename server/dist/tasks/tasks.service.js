"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid = require("uuid/v1");
const task_model_1 = require("./task.model");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
    }
    getAllTasks() {
        return this.tasks;
    }
    getTaskById(id) {
        const theOne = this.tasks.find(el => el.id === id);
        return theOne;
    }
    createTask(createTaskDto) {
        const { title, description } = createTaskDto;
        const task = {
            title,
            description,
            status: task_model_1.TaskStatus.OPEN,
            id: uuid(),
        };
        this.tasks.push(task);
        return task;
    }
    deleteTask(id) {
        const theOne = this.tasks.findIndex(el => el.id === id);
        const copy = Object.assign({}, this.tasks[theOne]);
        this.tasks = this.tasks.filter(el => el.id !== id);
        return { deleted: copy, updated: this.tasks };
    }
};
TasksService = __decorate([
    common_1.Injectable()
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map