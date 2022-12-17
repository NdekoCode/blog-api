export default class Alert {
  constructor(req, res) {
    this.res = res;
    this.req = req;
    this.otherData = {};
  }
  /**
   * @param {object} otherData
   */
  setOtherData(otherData) {
    this.otherData = otherData;
  }
  danger(message, statusCode = 400, type = "danger") {
    return this.makeAlert(statusCode, message, type);
  }

  success(message, statusCode = 200, type = "success") {
    return this.makeAlert(statusCode, message, type);
  }

  warning(message, statusCode = 200, type = "warning") {
    return this.makeAlert(statusCode, message, type);
  }

  info(message, statusCode = 100, type = "info") {
    return this.makeAlert(statusCode, message, type);
  }
  makeAlert(statusCode, message = "", type = "danger") {
    return this.res.status(statusCode).json({
      alert: {
        statusCode,
        message,
        type,
      },
      ...this.otherData,
    });
  }
}
