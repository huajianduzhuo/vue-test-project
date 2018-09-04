<template>
  <div class='container'>
    <draggable v-model='list' class='list'>
      <div v-for='(item, index) in list' class='item' :key='index'>
        {{item.name}}
      </div>
    </draggable>
    <table class='datalist'>
      <thead>
        <tr>
          <th v-for='(item, index) in list' :key='index'>{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, dataIndex) in dataList" :key="dataIndex">
          <td v-for="(column, columnIndex) in list" :key="columnIndex">
            {{data[column.name]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      list: [
        {
          name: 'ID'
        },
        {
          name: 'SetCode'
        },
        {
          name: 'SetType'
        },
        {
          name: 'SetValue'
        },
        {
          name: 'CreateBy'
        },
        {
          name: 'CreateDate'
        },
        {
          name: 'Module'
        }
      ],
      dataList: [{
        ID: 1039,
        SetCode: 'AccountLockTime',
        SetType: 'systemconfig',
        SetValue: '10',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2016-12-15T15:10:39',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'General'
      }, {
        ID: 1046,
        SetCode: 'OCRBankCardDayLimit',
        SetType: 'OCRSetting',
        SetValue: '1000',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-02-13T14:11:32',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1047,
        SetCode: 'OCRIDCardDayLimit',
        SetType: 'OCRSetting',
        SetValue: '1000',
        Descrips: null,
        Sort: 2,
        CreateBy: 1,
        CreateDate: '2017-02-13T14:11:32',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1050,
        SetCode: 'FMaxDownPaymentPercentage',
        SetType: 'QuickQuote',
        SetValue: '50',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-04-01T17:59:45',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1049,
        SetCode: 'WhiteList',
        SetType: 'Setting',
        SetValue: '15111111111',
        Descrips: null,
        Sort: 2,
        CreateBy: 1,
        CreateDate: '2017-02-13T18:19:32',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1051,
        SetCode: 'ClassInFinalPage',
        SetType: 'DateEntryFinalPage',
        SetValue: 'A,B,CLA,GLA,C',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-07-13T11:05:47',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1052,
        SetCode: 'DPInFinalPage',
        SetType: 'DateEntryFinalPage',
        SetValue: '50',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-07-13T11:05:47',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'Customer'
      }, {
        ID: 1055,
        SetCode: 'EmailSource',
        SetType: 'SendEmail',
        SetValue: 'ESB-eCom-MBAFC',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-08-10T17:50:33',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'General'
      }, {
        ID: 1056,
        SetCode: 'EmailsenderName',
        SetType: 'SendEmail',
        SetValue: '奔驰金融',
        Descrips: null,
        Sort: 1,
        CreateBy: 1,
        CreateDate: '2017-08-10T17:50:33',
        ModifiedBy: 0,
        ModifiedDate: '0001-01-01T00:00:00',
        Module: 'General'
      }]
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped lang='scss'>
.container {
  width: 950px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  color: #333333;
  font-size: 18px;
}
.list {
  width: 220px;
  border: 1px solid #ececec;
}
.item {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #ececec;
  &:last-child {
    border-bottom: none;
  }
}
.datalist {
  width: 650px;
  border: 1px solid #ececec;
  border-spacing: 0;
  th {
    background: lightblue;
  }
  th,
  td {
    height: 40px;
    border-right: 1px solid #ececec;
    font-size: 16px;
    &:last-child {
      border-right: none;
    }
  }
  tbody {
    tr {
      &:nth-child(even) {
        background: lightgoldenrodyellow;
      }
    }
  }
}
</style>