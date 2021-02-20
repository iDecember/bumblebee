<template>
  <div>
    <!-- <div v-for="item in seatList" :key="item.id">
      {{item}}
    </div> -->
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店选择</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->

    <el-row :gutter="20">
      <el-col :span='8'>
        <div><span class="demonstration">门店选择</span>
          <el-select v-model="shopId" placeholder="请选择">
            <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id" @change="dataList">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span='4'>
      </el-col>
      <el-col :span='7'>
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="dataList">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span='4'>
        <el-button type="primary" @click="dataList">查询</el-button>
        <el-button type="primary" @click="toShow">实时显示</el-button>
      </el-col>
    </el-row>

    <!--用户列表区域  -->

    <el-table v-if="flag" class="table1" :data="seatList" :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}" border stripe>
      <el-table-column label="座位号" prop="seatname" v-model="seatName">
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <!-- <div v-if="scope.row.users"> {{scope.row.users}}</div>
          <span v-if="scope.row.users.length != 0">-->
          <div v-for="(item,index) in scope.row.users" :key="index">
            {{item.card_name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          <div v-for="(item,index) in seatList[scope.$index].users" :key="index">
            {{scope.row.users[index].start_date}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="结束日期">
        <template slot-scope="scope">
          <div v-for="(item,index) in seatList[scope.$index].users" :key="index">
            {{scope.row.users[index].end_date}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房间" prop='room'></el-table-column>
      <el-table-column label="操作" prop='room'>
        <template slot-scope="scope">
          <!-- 新增 -->
          <el-tooltip class="item" effect="dark" content="新增用户" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="addUser(scope.row.seatname)"></el-button>
          </el-tooltip>
          <!-- 修改 -->
          <el-tooltip class="item" effect="dark" content="修改用户" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog添加用户 -->
    <el-dialog title="用户手机号" :visible.sync="addDialogVisible" width="30%">
      <el-input v-model="mobile"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定
        </el-button>
      </span>
    </el-dialog>
    <!--  <el-dialog title="用户手机号" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
    
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="70px">
        <el-form-item label="手机号" prop="usernumber">
          <el-input v-model="addForm.usernumber"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定
        </el-button>
      </span>
    </el-dialog> -->
    <!-- 用户信息dialog添加具体信息 -->
    <el-dialog title="用户信息" :visible.sync="addDialogVisible2" width="50%" >
      <!-- 内容主体区域 -->
      <el-form ref="addDetailsFormRef" :model="addDetailsForm" label-width="100px">
        <el-form-item label="手机号：" prop="usernumber">
          <el-input v-model="addDetailsForm.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="ID：" prop="usernumber">
          <el-input v-model="addDetailsForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="注册时间：" prop="usernumber">
          <el-input v-model="addDetailsForm.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="截止日期：" prop="usernumber">
          <el-input v-model="addDetailsForm.end_date" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户备注  ：" prop="usernumber">
          <el-input v-model="addDetailsForm.user_remarks" disabled></el-input>
        </el-form-item>
        <el-button type="primary" @click="addRecord(addDetailsForm.id,addDetailsForm.seatid)">增加消费记录</el-button>
      </el-form>
      <!-- 从北极星获取信息列表 -->
      <el-table :data="userInfoList">
        <el-table-column label="日期" prop='action_create_time'></el-table-column>
        <el-table-column label="行为" prop='action_name'></el-table-column>
        <el-table-column label="备注" prop='action_remarks'></el-table-column>
      </el-table>
      <!-- 分页 -->
      <!--  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[1, 5, 10]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
    </el-dialog>
    <!-- 用户不存在显示的dialog3 todo-->
    <!-- <el-dialog title="新增用户" :visible.sync="addDialogVisible3" width="50%" @close="addDialogClosed">
      <el-form ref="addUserFormRef" :model="addUserForm" label-width="100px">
        <el-form-item label="手机号：" prop="usernumber">
          <el-input v-model="addUserForm.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="usernumber">
          <el-input v-model="addUserForm.remarks" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <el-dialog class='addDialogVisiblee' title="用户手机号" :visible.sync="addDialogVisible3" width="50%">
      <div>手机号：<el-input v-model="NewUser.mobile" style="width:70%" disabled></el-input>
      </div>
      <div>&emsp;备注：<el-input v-model="NewUser.remark" style="width:70%"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addNewUser">确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 增加消费记录dialog -->
    <el-dialog title="用户信息" :visible.sync="addDialogVisible4" width="50%">
      <!-- 内容主体区域 -->

      <el-form class='addconsume' ref="addConsumeFormRef" :model="addConsumeForm">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="渠道：" prop="channel">
              <label slot="label">渠 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道：</label>
              <el-select v-model="addDetailsForm.channel" placeholder="渠道" style='width:60%'>
                <el-option v-for="item in channelOption" :key="item.index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销券码：" prop="mt_code">
              <el-input v-model="addConsumeForm.mt_code" style='width:60%'></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="成交价格：" prop="deal_price">
              <el-input v-model="addConsumeForm.deal_price" style='width:60%'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式：" prop="payment_type">
              <el-select v-model="addConsumeForm.payment_type" placeholder="付款方式" style='width:60%'>
                <el-option v-for="item in paymentOption" :key="item.index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="座位  ：">
              <label slot="label">座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</label>
              <el-input v-model="addConsumeForm.seatid" disabled style='width:60%'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡种：" prop="cardid">
              <label slot="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</label>
              <el-select v-model="addConsumeForm.cardid" placeholder="卡种" @focus='getCardList()' style='width:60%'>
                <el-option v-for="item in addConsumeForm.cardList" :key="item.id" :label="item.card_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="时长：" prop="days">
              <label slot="label">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</label>
              <el-input v-model="addConsumeForm.days" style='width:60%'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始时间：" prop="start_date">
              <el-input v-model="addConsumeForm.start_date" disabled style='width:60%'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="备注：" prop="remarks">
              <label slot="label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
              <el-input v-model="addConsumeForm.remarks" width="100%" style='width:60%'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item>
              <el-button @click="addDialogVisible4=false">取 消</el-button>
              <el-button type="primary" @click="createOrder">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-row class='addconsume' ref="addConsumeFormRef" :model="addConsumeForm">
        <el-col :span="8" label="渠道：" prop="channel">
          <label slot="label">渠 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道：</label>
          <el-select v-model="addDetailsForm.channel" placeholder="渠道" style="width:100%">
            <el-option v-for="item in channelOption" :key="item.index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

        </el-col>
        <el-col :span="8" label="核销券码：" prop="mt_code">

          <label slot="label">核销券码</label>
          <el-input v-model="addConsumeForm.seatid"></el-input>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" label="成交价格：" prop="deal_price">
          <el-input v-model="addConsumeForm.deal_price"></el-input>
        </el-col>
        <el-col :span="8" label="付款方式：" prop="payment_type">
          <el-select v-model="addConsumeForm.payment_type" placeholder="付款方式">
            <el-option v-for="item in paymentOption" :key="item.index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>

        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </el-row> -->

    </el-dialog>
  </div>
</template>

<script>
  import Utils from '../../utils/api'
  /*  import {
    getUserStatus
  } from 'c:/Users/ichenxi/Desktop/bee/beeeee/src/utils/api' */
  export default {
    data() {
      //验证手机号规则
      /*   var checkMobile = (rules, value, cb) => {
          //验证手机号的正则表达式
          const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

          if (regMobile.test(value)) {
            return cb()
          }
          cb(new Error('请输入合法的手机号'))
        } */
      return {

        seatList: [],
        seatStatusList: [],
        userInfoList: [],
        seatOption: [],
        flag: false,
        //控制添加对话框的显示和隐藏
        addDialogVisible: false,
        //控制具体信息添加的对话框显示和隐藏
        addDialogVisible2: false,
        //没有此用户的时候弹出的dialog
        addDialogVisible3: false,
        //增加消费记录dialog
        addDialogVisible4: false,
        //用户手机号
        mobile: '',
        //用户不存在时的备注
        remark: '',
        //用户存在获取id
        id: '',
        //用户存在获取创建时间
        create_time: '',
        //添加具体信息
        addDetailsForm: {
          mobile: '',
          seatid: '',
          userid: '',
          create_time: '',
          userenddate: '',
          userremark: ''
        },
        //增加订单
        addConsumeForm: {
          userid: '',
          channel: '',
          cardid: '',
          start_date: '',
          payment_type: '',
          days: '',
          seatid: '',
          remarks: '',
          mt_code: '',
          deal_price: '',
          cardList: []
        },
        /*  addUserForm:{
           mobile:'',
           remarks:''
         }, */
        NewUser: {
          mobile: '',
          remark: '',
        },
        //查询框日期
        date: '',
        //查询框店铺id
        shopList: [],
        shopId: 6,
        channelOption: [{
            id: 1,
            name: '美团'
          },
          {
            id: 2,
            name: '线下'
          }
        ],
        paymentOption: [{
            id: 1,
            name: '现金'
          },
          {
            id: 2,
            name: '美团'
          },
          {
            id: 3,
            name: '美团+返现'
          }
        ],
        //座位id
        seatName: ''
        //卡种列表
        //cardList:[]
        //添加表单的验证规则
        /*  addFormRules: {
           usernumber: [{
             required: true,
             message: '请输入手机号',
             trigger: 'blur'
           }, {
             min: 11,
             max: 11,
             message: '请输入11位手机号码',
             trigger: 'blur'
           }, {
             validator: checkMobile,
             trigger: 'blur'
           }]
         } */

      }
    },

    created() {
      let d = new Date()
      let year = d.getFullYear()
      let month =
        d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      this.date = year + '-' + month + '-' + day // 默认今天
      this.addConsumeForm.start_date = year + '-' + month + '-' + day
      this.getSeatList()
      this.getSeatStatusList()
      this.dataList()
      this.getShopList()
    },
    mounted() {
      var that = this
      Utils.$on(() => {
        //console.log(msg)
        that.dataList()
      })
    },
    methods: {
      toShow() {
        this.$router.push({
          path: './show'
        })
      },
      //获取座位列表信息
      async getSeatList() {
        sessionStorage.setItem('shopid', this.shopId)
        sessionStorage.setItem('date', this.date)
        // 获取座位信息
        let params = {
          shopid: this.shopId
          //date: this.date
        }
        const res = await this.$http.get('/get_seat_list?' + this.$qs.stringify(params))
        if (res.data.code === 20000) {
          this.seatList = res.data.data
          this.seatOption = res.data.data
          //console.log(res)
        }
      },
      //获取座位状态列表信息
      async getSeatStatusList() {
        let params = {
          shopid: this.shopId,
          date: this.date
        }
        const res = await this.$http.get('/get_seat_status_list?' + this.$qs.stringify(params))
        if (res.data.code === 20000) {
          this.seatStatusList = res.data.data
        }
      },
      //处理数组，将state中的数组增加到seatlist中，方便显示在页面
      async data() {
        this.$forceUpdate()
        let _this = this
        this.seatList.map(function (item, index) {
          _this.seatList[index].users = []
        })
        for (let s of this.seatStatusList) {
          this.seatList.some(function (item, index) { // some函数相当于箭头函数，this指向问题
            if (Number(s.seatid) === Number(item.id)) {
              let obj = {
                id: s.id,
                card_name: s.card_name,
                days: s.days,
                start_date: s.start_date,
                end_date: s.end_date
              }
              _this.seatList[index].users.push(obj)
            }
          })
        }
      },
      //异步处理数据
      async dataList() {
        await this.getSeatList()
        await this.getSeatStatusList()
        await this.data()
        this.flag = true
      },
      //监听添加用户对话框关闭事件
     /*  addDialogClosed() {
        this.$refs.addDetailsFormRef.resetFields()
      }, */
      async submit() {
        let params = {
          mobile: this.mobile
        }
        const res = await this.$http.get('/get_user_status?' + this.$qs.stringify(params))
        //console.log(res)
        if (res.data.code === 40101) {
          this.$message.error('用户不存在')
          this.addDialogVisible = false
          this.addDialogVisible3 = true
          this.NewUser.mobile = this.mobile
        } else if (res.data.code === 20000) {
          this.addDetailsForm.id = res.data.data.id
          //this.addDetailsForm.create_time=res.data.data.create_time
          //this.addDetailsForm.remark=res.data.data.user_remarks
          this.addDialogVisible = false
          this.addDialogVisible2 = true
          //this.addDialogVisiblee.mobile= res.data.data.id
          this.getUserInfo(res.data.date)
        }
        //this.addDetailsForm.mobile = this.mobile
      },
      //处理数据两个
      async getUserInfo() {
        await this.getUserDetails()
        await this.getActionList()
      },
      //获取用户具体信息
      async getUserDetails() {
        let params = {
          userid: this.addDetailsForm.id
        }
        const res = await this.$http.get('/get_user_details?' + this.$qs.stringify(params))
        if (res.data.code === 20000) {
          this.addDetailsForm.id = res.data.data.id
          this.addDetailsForm.mobile = res.data.data.mobile
          this.addDetailsForm.create_time = res.data.data.create_time
          this.addDetailsForm.end_date = res.data.data.end_date
          this.addDetailsForm.user_remarks = res.data.data.user_remarks
          this.addDetailsForm.seatid = res.data.data.seatid
        }
      },
      //从美团后台获取数据
      async getActionList() {
        let params = {
          userid: this.addDetailsForm.id
        }
        const res = await this.$http.get('get_action_list?' + this.$qs.stringify(params))
        this.userInfoList = res.data.data
        //console.log(this.userInfoList)
      },
      /*  addUser(id) {
         this.order.seatid = id
         // 增加消费用户
         this.dialogVisible3 = true
       }, */
      //搜索框获取店铺id
      async getShopList() {
        const res = await this.$http.get('/get_shop_list')
        this.shopList = res.data.data
        //console.log(this.shopList)
      },
      //增加消费记录
      addRecord(id, seatid) {
        this.addDialogVisible2 = false
        this.addDialogVisible4 = true
        this.addConsumeForm.userid = id
        //this.addConsumeForm.seatid = seatid
        /*  if (seatid==null){
           this.addConsumeForm.seatid=seatid
         } */
        //console.log(seatid)
      },
      //获取卡种类
      async getCardList() {
        let params = {
          shopid: this.shopId
        }
        const res = await this.$http.get('/get_card_list?' + this.$qs.stringify(params))
        if (res.data.code === 20000)
          this.addConsumeForm.cardList = res.data.data
        //console.log(this.addConsumeForm.cardList)
      },
      //获取当前座位的id传给增加定单页面
      addUser(seatname) {
        this.addDialogVisible = true
        this.addConsumeForm.seatid = seatname
        //console.log(this.addConsumeForm.seatid)
        // 把这个id再赋值给data里定义的那个 接下来懂了 只是刚才这个操作不会
        // 每一个scope只对应你那一行，然后scope.row就是你那一行的所有数据再取 id。懂了懂了thanks
      },
      async createOrder() {
        /*    let params=this.addConsumeForm */
        let params = {
          userid: this.addDetailsForm.id,
          channel: this.addConsumeForm.channel,
          payment_type: this.addConsumeForm.payment_type,
          cardid: this.addConsumeForm.cardid,
          start_date: this.addConsumeForm.start_date,
          days: this.addConsumeForm.days,
          seatid: this.addConsumeForm.seatid,
          remarks: this.addConsumeForm.remarks,
          mt_code: this.addConsumeForm.mt_code,
          deal_price: this.addConsumeForm.deal_price
        }
        console.log(this.addConsumeForm.payment_type)
        const res = await this.$http.post('/create_order?' + this.$qs.stringify(params))
        if (res.data.code = 20000) {
          return this.$message.success("增加成功")
          this.addDialogVisible4 = false
          this.dataList()
        }

      },
      async addNewUser() {
        let params = {
          mobile: this.NewUser.mobile,
          remarks: this.NewUser.remark
        }
        const res = await this.$http.post('/create_user?' + this.$qs.stringify(params))
        if (res.data.code === 20000) {
          return this.$message.success('增加成功')
        } else {
          return this.$message.error('增加失败')
        }
        //console.log(res)
      }
    }
  }

</script>
<style lang='less' scope>
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }

  .addconsume>el-col {
    margin-left: 50px;
  }

</style>
