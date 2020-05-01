import React, { Component } from 'react'

import {editOrder,viewOrder} from '../../api';

// import { Table, Divider, Tag, Card, Pagination ,Button} from 'antd';
import { Table, Card, Pagination ,Button,Input,Modal,Form,message,Cascader,Icon} from 'antd';
import ExportJsonExcel from 'js-export-excel';
import {connect} from "react-redux"
import {getOrdersList} from "./store/actionCreators"
import { PageDiv } from './style'

// import { Link } from 'react-router-dom';
// 格式化日期
import moment from 'moment';
const { Search } = Input;

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagenum:1,
            pagesize:5,
            query:"",
            order_id:"",
            order_price:"",
            is_send:"",
            order_pay:"",
            pay_status:"",
            visibleA:false,
            visibleB:false,
            goods:[],
            id:0,
            data4:[]
            
        }
    }

    render() {
      // 级联选择器
  const options = [
    {
      value: '0',
      label: '未付款',
      children: [
        {
          value: '0',
          label: '未支付',
        },
      ],
    },
    {
      value: '1',
      label: '已付款',
      children: [
        {
          value: '1',
          label: '支付宝',
        },
        {
          value: '2',
          label: '微信',
        },
        {
          value: '3',
          label: '银行卡',
        },
      ],
    },
  ];

  const options2 = [
    {
      value: '0',
      label: '否',
    
    },
    {
      value: '1',
      label: '是',
 
    },
  ];
        // const { getFieldDecorator } = this.props.form;
    
        //订单列表key
        const listData=this.props.data
        if(listData){
            listData.forEach(element => {
                element.key=element.order_id
            });
        }

        //
        const aaa=this.state.data4
        if(aaa){
            aaa.forEach(element => {
                element.key=element.order_id+Math.random()*222
            });
        }
        //列表
        const columns = [
            {
                title: '编号',
                dataIndex: 'order_id',
                key: 'order_id',
                width: '60px',
                render: text => <span>{text}</span>,
            },
            {
                title: '用户编号',
                dataIndex: 'user_id',
                key: 'user_id',
                width: '90px',
            },
            
            {
                title: '价格',
                dataIndex: 'order_price',
                key: 'order_price',
            },
            {
                title: '时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: create_time => {
                    return moment(parseInt(create_time)).format("YYYY-MM-DD HH:mm:ss");
                  }
            },
            {
                title: '是否付款',
                key: 'order_pay',
                dataIndex: 'order_pay',
                render: order_pay => {
                  if (order_pay === '0') {
                    return <Button type="danger" size="small" >未支付</Button>
                  }else if (order_pay === '1') {
                    return <Button type="primary" size="small" >支付宝</Button>
                  }else if (order_pay === '2') {
                    return <Button type="primary" size="small">微信</Button>
                  }else{
                    return <Button type="primary" size="small">银行卡</Button>
                  }
                }
               
            },
            {
                title: '是否发货',
                key: 'is_send',
                dataIndex: 'is_send',
                render: is_send => {
                  if (is_send === '是') {
                    return <Button type="primary" size="small" >是</Button>
                  }else{
                    return <Button type="danger" size="small">否</Button>
                  }
                }
            },
            {
                title: '付款状态',
                key: 'pay_status',
                dataIndex: 'pay_status',
                render: pay_status => {
                  if (pay_status!==1) {
                    return <Button type="danger" size="small">未付款</Button>
                  }else{
                    return <Button type="primary" size="small">已付款</Button>
                  }
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {/* <span>Invite {record.name}</span>
                        <Divider type="vertical" />
                        <span>Delete</span> */}
                    {/* <Link to="/admin/orders/ordersupdate"> */}
                    <Button type="primary" size="small" onClick={this.showModal.bind(this,record)}> <Icon type="edit" /> </Button>
                    {/* </Link> */}
                    &nbsp;
                    {/* <Link to="/admin/orders/orderslook"> */}
                    <Button type="primary" size="small" onClick={this.viewModal.bind(this,record)}><Icon type="eye" /> </Button>
                    {/* </Link> */}
                    &nbsp;
                    </span>
                   
                ),
                
            },
        ];

        const columns2 = [
            {
              title: '商品编号',
              dataIndex: 'goods_id',
              key: 'goods_id',
              render: text => <span>{text}</span>,
            },
            {
              title: '商品价格',
              dataIndex: 'goods_price',
              key: 'goods_price',
            },
            {
              title: '商品数量',
              dataIndex: 'goods_number',
              key: 'goods_number',
            },
            {
              title: '商品总价',
              dataIndex: 'goods_total_price',
              key: 'goods_total_price',
            },
        
          ];
          
        // const data = listData

        return (
            <div>
                <Card title="订单管理" extra={<Button type="primary" onClick={this.ExportToExcel.bind(this,listData)}>导出excel表格</Button>} >

                {/* //搜索 */}
                <Search
                    enterButton
                    placeholder="输入用户编号"
                    // onSearch={value => console.log(value)}
                    onSearch={this.onSearchFn.bind(this)}
                    onKeyDown={this.keyDownFn.bind(this)}
                    style={{ width: 300 ,height:40}}
                />
                &nbsp;&nbsp;&nbsp;
               <Button type="primary" onClick = {this.handlePrint}>打印表格</Button>

                    {/* //列表 */}
                    <Table columns={columns} id='printArea' dataSource={listData} pagination={false} rowKey={key=>key=Math.random()*100000}/>
                    <PageDiv>
                        {/* 分页 */}
                        <Pagination pageSize={5}  defaultCurrent={1}  onChange={this.changePageFn.bind(this)} total={this.props.total} />
                    </PageDiv>
                </Card>

                {/* 订单编辑 */}
                <Modal
                  title="订单编辑"
                  visible={this.state.visibleA}
                  footer={null}
                  closable={false}
                >
                  <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit} style={{width:"180%"}}>


                    <Form.Item >
                        {/* {getFieldDecorator("number", {
                            rules: [{ required: true, message: '请输入你的订单价格!' }],
                        })(<Input placeholder="订单价格" />)} */}
                        订单价格：<Input placeholder="订单价格" 
                                value={this.state.order_price}
                                name='order_price'
                                 onChange={(e)=>this.changeFn(e)}/>
                    </Form.Item>

                    <Form.Item>
                        是否发货：
                        {/* {getFieldDecorator('is_send', {
                            rules: [{ required: true, message: '请选择' }],
                        })(
                           
                        )} */}
                        
                            <Cascader 
                            style={{ width: 200 }} 
                            // fieldNames={{ label: '未付款', value: '未付款', children: 'items' }}
                            options={options2} 
                            // onChange={this.payChange.bind(this)} 
                            placeholder="是否发货" 
                            expandTrigger="hover"
                            onChange={(options2)=>this.changeFn3(options2)}
                            />
                        </Form.Item>

                        <Form.Item>
                        支付状态和是否支付
                        {/* {getFieldDecorator('payState', {
                            rules: [{ required: true, message: '请选择支付方式' }],
                        })(
                            <Cascader 
                            style={{ width: 200 }} 
                            options={options} 
                            // onChange={this.payChange.bind(this)} 
                            placeholder="请选择支付状态和支付方式" 
                            expandTrigger="hover"
                            />
                        )} */}
                        <Cascader 
                            style={{ width: 200 }} 
                            // fieldNames={{ label: '未付款', value: '未付款', children: 'items' }}
                            options={options} 
                            // onChange={this.payChange.bind(this)} 
                            placeholder="支付状态和是否支付" 
                            expandTrigger="hover"
                            onChange={(options)=>this.changeFn2(options)}
                            />
                        </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" onClick={this.handleCancel.bind(this)}>取消</Button>
                    &nbsp; &nbsp;
                        <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                    </Form>
                </Modal>

                 {/* 查看订单详细信息 */}
                 <Modal
                  title="查看订单详细信息"
                  visible={this.state.visibleB}
                  footer={null}
                  closable={false}
                >
                     <Table columns={columns2} dataSource={this.state.data4} pagination={false} />

                     <Button type="primary" onClick={this.handleCancelB.bind(this)} style={{marginTop:"10px",marginLeft:"200px"}}>关闭</Button>
                 </Modal>

            </div>
        )
    }

    //搜索
    onSearchFn(value){
        // console.log(query,"search")
        this.setState({
            query:value
        })
        // console.log(value)
        this.props.getList(this.state.pagenum,this.state.pagesize,value,value)
    }

    // 回车搜索
    keyDownFn(e){
        if(e.keyCode===13){
          this.onSearchFn(e.target.value)
        }
      }

    //分页改变
    changePageFn(current, pageSize) {
        // console.log(current,pageSize)
        // console.log(this.state.total)
        this.props.getList(current,pageSize,this.state.query)
    }

    // 编辑
    showModal = info => {
        this.setState({
          visibleA: true,
          
          order_id:info.order_id,
          order_price:info.order_price,
          is_send:info.is_send,
          order_pay:info.order_pay,
          pay_status:info.pay_status
        });
        // console.log(info.is_send)
      }

      // 编辑改变值
      changeFn(e){

        let value=e.target.value
        let name=e.target.name
        this.setState({
            [name]:value
        })
      }

      //是否发货改变值
      changeFn2(options){
        // console.log(options[0])
        let pay_status=options[0]
        let order_pay=options[1]
        // let name=e.target.name
        this.setState({
          pay_status:pay_status,
          order_pay:order_pay
        })
      }
      //是否支付，支付状态
      changeFn3(options2){
        // console.log(options2)
        let is_send=options2[0]
        // let name=e.target.name
        this.setState({
          is_send:is_send,
        })
      }

    //   编辑请求接口
      handleSubmit = e => {
        e.preventDefault();
        let editForm={
           order_price:this.state.order_price,
           is_send:this.state.is_send,
           order_pay:this.state.order_pay,
           pay_status:this.state.pay_status,
               }

               setTimeout(()=>{
                editOrder(this.state.order_id,editForm)
               .then(res=>{
                //  console.log(res)
                 if(res.meta.status===201){
                    message.success('修改成功！');
                    // setTimeout(()=>{
                      this.props.history.push('/admin/orders')
                    // },1000)
                   }else{
                    message.error('修改失败！');
                   }
               })
               this.setState({
                visibleA: false,
              });
              this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query,this.state.user_id)
              },200)
      
       
      };
    
      //取消编辑
      handleCancel(){
        this.setState({
          visibleA: false,
        });
      };

        //   查看订单详细信息
    viewModal = info => {
        this.setState({
          visibleB: true,
            
          id:info.order_id,
          goods:info.goods
        });

        let lookdata={
            goods:this.state.goods,
                }
                // console.log(this.state.id,lookdata,22)
                
                setTimeout(()=>{
                    viewOrder(this.state.id,lookdata)
                    .then(res=>{
                        // console.log(res,11)
                      if(res.meta.status===200){
                        //  console.log(res)
                        this.setState({
                            data4:res.data.goods
                        })
                         message.success('查看成功');
                        }else{
                         message.error('查看失败！');
                        }
                        
                    })
                  },200)

    this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query,this.state.user_id)
      }

      //关闭查看订单详细信息
      handleCancelB(){
        this.setState({
          visibleB: false,
        });
      };

      // 导出excel
      ExportToExcel(listData) {
        // console.log(listData)
        const hhhh = listData // 准备的数据
        var option8 = {}
        let dataTable = []
        if (hhhh) {
          for (let i in hhhh) {
            if (hhhh) {
              let obj = {
                '编号': hhhh[i].order_id,  // '列名': 数据
                '用户编号': hhhh[i].user_id,
                '订单价格': hhhh[i].order_number,
                '订单编号': hhhh[i].order_price,
                '下单时间': hhhh[i].create_time,
                '是否发货': hhhh[i].is_send,
              }
              dataTable.push(obj);
            }
          }
        }
  
        option8.fileName = '用户列表'  //导出的Excel文件名
        option8.datas = [
          {
            sheetData: dataTable,
            sheetName: 'sheet',
            sheetFilter: ['编号', '用户编号', '订单价格', '订单编号', '下单时间', '是否发货'],
            sheetHeader: ['编号', '用户编号', '订单价格', '订单编号', '下单时间', '是否发货'],
          }
        ]
  
        var toExcel = new ExportJsonExcel(option8);
        toExcel.saveExcel();
      }

        // 打印
  handlePrint = () => {
    // const win = window.open('','printwindow');
    document.write(window.document.getElementById('printArea').innerHTML);
    // window.document.getElementById('printArea')
    window.print();
    window.close();
    window.location.reload()
}

    componentDidMount(){
        // console.log(this.props)
        this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query,this.state.user_id)
    }

}

const mapStateToProps = state => { // state就是仓库store数据
    // console.log(state.toJS().getOrders.getOrders.goods.user_id)
      return { // 组件中通过 this.props.键 来获取数据
          // 键: state.数据
          data: state.toJS().getOrders.getOrders.goods,
          total: state.toJS().getOrders.getOrders.total,
          pagenum: state.toJS().getOrders.getOrders.pagenum,
        //   user_id:data.user_id,
          
      }
  }
  const mapDispatchToProps= dispatch => {
      return { // 组件中通过this.props.键()
          getList:(pagenum,pagesize,query,user_id)=>dispatch(getOrdersList(pagenum,pagesize,query,user_id))
          // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
          // incrment: () => dispatch(incrment())
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(index)