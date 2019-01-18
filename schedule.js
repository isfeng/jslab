const cron = require('node-schedule')
// const rule = {hour: 1, minute: 30}
const rule = {second: 30}

cron.scheduleJob(rule, function () {
  console.log(new Date(), rule);
});
