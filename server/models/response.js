var Response = function() {

  var startTime = new Date().getTime();

  this.meta = {};
  this.data = {};

  this.calculateExecutionTime = function () {
    var endTime = new Date().getTime();
    this.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;
  }

}

module.exports = Response;
