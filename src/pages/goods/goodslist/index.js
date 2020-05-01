import React,{Component} from 'react';
import { Table, Divider,Card,Pagination,Button,Input,Modal ,Icon,Form,Cascader,message,Spin} from 'antd';
import {PageStyle} from './style';
import {connect} from 'react-redux'
import {
  Link
} from 'react-router-dom';
import {getGoodsList,deleteGoodsItem,changeSpinning} from '../goodslist/store/actionCate';
import {getGoodsCateList,updateGoods} from '../../../api';
// 格式化日期
import moment from 'moment';
const { Search } = Input;
class Index extends Component
{
    constructor(props){
      super(props)
      this.state={
        pagenum:1,
        pagesize:10,
        query:'',
        visible: false ,
        goods_id:'',
        goods_name:'',
        goods_price:'',
        goods_weight:'',
        goods_number:'',
        goods_cat:'',
        data:[],
        spinning:true,
      }
    }
    render(){
        let options=this.state.data
        const columns = [
            {
              title: '编号',
              dataIndex: 'goods_id',
              key: 'goods_id',
              render: text => <span>{text}</span>,
            },
            {
              title: '商品名称',
              dataIndex: 'goods_name',
              key: 'goods_name',
            },
            {
              title: '价格',
              dataIndex: 'goods_price',
              key: 'goods_price',
            },
            {
              title: '商品数量',
              dataIndex: 'goods_number',
              key: 'goods_number'
            },
            {
                title: '商品重量',
                dataIndex: 'goods_weight',
                key: 'goods_weight',
              },
            {
              title: '创建于',
              dataIndex: 'add_time',
              key: 'add_time',
              render: add_time => {
                return moment(parseInt(add_time)).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                  <span><Button type="primary" size="small" onClick={this.showModal.bind(this,record)}><Icon type="edit" /></Button></span>
                  <Divider type="vertical" />
                  <span><Button type="danger" size="small" onClick={this.del.bind(this,record)}><Icon type="delete" /></Button></span>
                </span>
              ),
            },
          ];
        return(
            <div>
                <Card title="商品列表" extra={<Button type="dashed">导出表格</Button>}>   
                <Spin tip="Loading..." spinning={this.props.spinning}>
                <Search
                    enterButton
                    placeholder="输入商品名称"
                    onSearch={value=>this.props.getList(this.state.pagenum,this.state.pagesize,value)}
                    style={{ width: 300 ,height:40}}
                />
                <Link to="/admin/addgoods">
                <Button type="primary" style={{margin:'0 0 10px 10px'}}>添加商品</Button>
                </Link>
                    <Table columns={columns} dataSource={this.props.goodsList.goods} pagination={false}  rowKey = {row => row.goods_id}/>
                    <PageStyle>
                        <Pagination
                            onChange={this.onShowSizeChange.bind(this)}
                            defaultCurrent={1}
                            total={this.props.goodsList.total}
                        />
                    </PageStyle>
                    </Spin>
                </Card>

                {/* 编辑################################### */}
                <Modal
                  footer={null}
                  closable={false}
                  title="编辑商品信息"
                  visible={this.state.visible}
                >
                  <Form onSubmit={this.handleSubmit} className="login-form">
                      <Form.Item>
                          <Input
                              value={this.state.goods_name}
                              name='goods_name'
                              onChange={(e)=>this.changeFn(e)}
                              style={{marginTop:'20px'}}
                              size={"large"}
                              placeholder="商品名称"
                              prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                          />
                      </Form.Item>
                      <Form.Item>
                          <Input
                              value={this.state.goods_price}
                              name='goods_price'
                              onChange={(e)=>this.changeFn(e)}
                              style={{marginTop:'20px'}}
                              size={"large"}
                              placeholder="商品价格"
                              prefix={<Icon type="pound" style={{ color: 'rgba(0,0,0,.25)'}} />}
                          />
                      </Form.Item>
                      <Form.Item>
                          <Input
                              value={this.state.goods_weight}
                              name='goods_weight'
                              onChange={(e)=>this.changeFn(e)}
                              style={{marginTop:'20px'}}
                              size={"large"}
                              placeholder="商品重量"
                              prefix={<Icon type="gold" style={{ color: 'rgba(0,0,0,.25)'}} />}
                          />
                      </Form.Item>
                      <Form.Item>
                          <Input
                              value={this.state.goods_number}
                              name='goods_number'
                              onChange={(e)=>this.changeFn(e)}
                              style={{marginTop:'20px'}}
                              size={"large"}
                              placeholder="商品数量"
                              prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)'}} />}
                          />
                      </Form.Item>
                      <Form.Item>
                      <Cascader
                              fieldNames={{ label: 'cat_name', value: 'cat_id', children: 'children' }}
                              options={options}
                              onChange={this.onChangeFn.bind(this)}
                              placeholder="请选择分类"
                              style={{width:'200px'}}
                          />,
                      </Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100px',marginRight:10}}>
                          提交
                      </Button>
                      <Button type="dashed" onClick={this.goBack.bind(this)}>返回</Button>
                  </Form>
                </Modal>
            </div>
        )
    }
    // value => this.props.getList(this.state.pagenum,this.state.pagesize,value),this.updateFn.bind(this)
    onShowSizeChange(current, pageSize) {
        this.props.incrment()
        this.props.getList(current,pageSize,this.state.query)
    }
    //删除
    del(a){
      this.props.delItem(a.goods_id)
      setTimeout(()=>{
        this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query)
      },500)
    }

    //编辑#############################
      //打开对话框
    showModal = a => {
      this.setState({
        visible: true,
      });
      this.setState({
        goods_id:a.goods_id,
        goods_name:a.goods_name,
        goods_price:a.goods_price,
        goods_weight:a.goods_weight,
        goods_number:a.goods_number,
      })
    };

    //分类
    onChangeFn(value) {
      let goods_cat = value.join(',')  
      // console.log(goods_cat)
      this.setState({
          goods_cat
      })
      // console.log(this.state.goods_cat)
    }

    goBack(){
      this.setState({
        visible:false
      })
    }
    //input框输入
    changeFn(e){
      // console.log(e.target.value)
      let value=e.target.value
      let name=e.target.name
      this.setState({
          [name]:value
      })
    }
    //点击提交编辑
    handleSubmit = e => {
      e.preventDefault();
        let editForm={
          goods_name:this.state.goods_name,
          goods_price:this.state.goods_price,
          goods_weight:this.state.goods_weight,
          goods_number:this.state.goods_number,
          goods_cat:this.state.goods_cat,
        }
        updateGoods(this.state.goods_id,editForm)
        .then(res=>{
          if(res.meta.status!==200){
            message.error('编辑失败！！！！！');
            }else{
              message.success('编辑成功！！！！！');
                this.setState({
                  visible:false
                })
                this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query)

            }
        })
  };

    componentDidMount(){
        this.props.getList(this.state.pagenum,this.state.pagesize,this.state.query)
        getGoodsCateList()
        .then(res=>{
            // console.log(res)
            const data=res.data
            this.setState({
                data
            })
        })
    }
} 

const mapStateToProps = state => { // state就是仓库store数据
  // console.log(state.toJS().goodslist.spinning)
    return { // 组件中通过 this.props.键 来获取数据
        // 键: state.数据
        goodsList:state.toJS().goodslist.goodsList,
        spinning:state.toJS().goodslist.spinning
       
    }
}
const mapDispatchToProps= dispatch => {
    return { // 组件中通过this.props.键()
      getList:(pagenum,pagesize,query)=>dispatch(getGoodsList(pagenum,pagesize,query)),
      delItem:(goodsId)=>dispatch(deleteGoodsItem(goodsId)),
      // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
      incrment: () => dispatch(changeSpinning())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
