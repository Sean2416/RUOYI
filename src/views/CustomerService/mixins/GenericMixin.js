  import $ from 'jquery';
  import moment from "moment";
  var options = require('@/assets/js/options.js');
  import { Notification } from 'element-ui'

  export default {
    data: function () {
      return {
        options: options
      };
    },
    methods: {
      resetForm(formName) {
        if (this.$refs[formName] != undefined)
          this.$refs[formName].resetFields();
      },      
      showOnMap(row) {
        window.open(`https://www.google.com/maps/search/?api=1&query=${row.latitude},${row.longitude}`);
      },
      createWarm(message)
      { 
        Notification.warning({
        title: '系統提示',
        message: message
       });
      },
      checkResponseValue(result, colName)
      {
        if (result === undefined || result[colName] === undefined) 
          return false;

        return true;
      },
      convertDataToArray(data)
      {
        if (Array.isArray(data)) 
          return data;
          
        var arr = [];
        arr.push(data)
        return arr;
      },
      getDate(addDays) {
        var date = new Date();
        return moment(date.setDate(date.getDate() - addDays)).format("YYYY/MM/DD");
      },
      getDateInterval(start, end) {
        return [this.getDate(start), this.getDate(end)]
      },
      convertStoreType(typeString) {
        var vi = this;
        var arr = typeString.split(",");
        var typeString = "";

        arr.forEach(element => {

          let type = $.grep(vi.options.storeType, function (r) {
            return r.value == element;
          })
          if (type.length > 0)
            typeString += type[0].label + ",";

        });

        return typeString.substring(0, typeString.length - 1);
      },
      convertCouponType(typeString) {
        var vi = this;

        let type = $.grep(vi.options.couponType, function (r) {
          return r.value == typeString;
        })

        return type[0].label;
      },
      convertStatusFromString(status) {
        if (status.toUpperCase() === "Y")
          return "是";

        return "否";
      }
    }
  }
