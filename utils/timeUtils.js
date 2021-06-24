const moment = require('moment')

module.exports = {

  //Get current local date and time
  async getCurrentLocalDateTime() {
    return moment().format('YYYY-MM-DD hh:mm:ss A');
  },

  //Get current UTC date and time
  async getCurrentUTCDateTime() {
    return moment.utc().format('YYYY-MM-DD hh:mm:ss A');
  },

  //Convert local time to UTC time
  async convertLocalToUTC(dt, dtFormat) {
    return moment(dt, dtFormat).utc().format('YYYY-MM-DD hh:mm:ss A');
  },

  //Convert UTC time to local time
  async convertUTCToLocal(utcDt, utcDtFormat) {
    var toDt = moment.utc(utcDt, utcDtFormat).toDate();
    return moment(toDt).format('YYYY-MM-DD hh:mm:ss A');
  },

  //Convert UTC time to another timezone
  async convertUTCToTimezone(utcDt, utcDtFormat, timezone) {
    return moment.utc(utcDt, utcDtFormat).tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
  },

  //Convert local time to another timezone
  async convertLocalToTimezone(localDt, localDtFormat, timezone) {
    return moment(localDt, localDtFormat).tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
  }
}