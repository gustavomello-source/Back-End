var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (Task.list().length == 0) {
        Task.new("Tarefa 1", "low");
        Task.new("Tarefa 2", "medium");
    }

    let obj = Task.getElementById(req.query.tid);
    res.render('index', { tasks: Task.list(), task: obj });
});

router.get('/tarefas/alfabetica', function(req, res) {
    res.render('listAlphabetical', { tasks: Task.listAlphabetical() });
});

router.get('/tarefas/contagem', function(req, res) {
    res.render('taskCount', { count: Task.count() });
});

router.post("/tarefas", function (req, res){
    const {error, value} = TaskSchema.validate(req.body);
    if (error) {
        res.render('index', { tasks: Task.list(), erro: "Dados incompletos" });
        return;
    }
    
    const {id, nome, priority} = value
    if (id === undefined) {
        //Inserir
        Task.new(nome, priority);
    } else {
        //Alterar
        Task.update(id, nome, priority);
    }
    
    res.redirect("/");
});

router.get("/tarefas/done/:id", function(req, res){
    const {id} = req.params;
    const {error, value} = Joi.number().integer().greater(0).validate(id)

    if (error || !Task.delete(value)) {
        res.send("Falha ao finalizar a tarefa");
        return;
    }
    res.redirect("/");
});

router.get("/tarefas/del/:id", function(req, res){
    const {id} = req.params;
    const {error, value} = Joi.number().integer().greater(0).validate(id)

    if (error || !Task.delete(value)) {
        res.send("Falha ao excluir uma tarefa");
        return;
    }
    res.redirect("/");
});

module.exports = router;