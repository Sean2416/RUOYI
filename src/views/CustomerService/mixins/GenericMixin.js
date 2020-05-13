  import $ from 'jquery';
  import moment from "moment";
  var options = require('@/assets/js/options.js');

  export default {
    data: function () {
      return {
        storeType: options.storeType,
      };
    },
    methods: {
      resetForm(formName) {
        if (this.$refs[formName] != undefined)
          this.$refs[formName].resetFields();
      },
      getDate(addDays){
        var date = new Date();
        return moment(date.setDate(date.getDate() - addDays)).format("YYYY/MM/DD");
      },
      getDateInterval(start, end)
      {
        return [this.getDate(start), this.getDate(end)]
      },
      convertStoreType(typeString)
      {
        var vi = this;
        var arr = typeString.split(",");
        var typeString = "";

        arr.forEach(element => {

          let type = $.grep(vi.storeType, function (r) {
            return r.value == element;
          })
          if (type.length > 0)
           typeString += type[0].label + ",";

        });

        return typeString.substring(0, typeString.length-1);
      }
    }
  }
  