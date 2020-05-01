//导入库
import React,{PureComponent} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {PageStyle} from './style';

//导入接口
import {deleteGoodsCate, setGoodsCate } from '../../../api/index';

// 导入UI组件
import { Card,Button,Table,Divider,Tag,Input,Modal,Popconfirm, message,Form,Pagination,Spin} from 'antd';

import { getCategoriesList, selectCate ,changeSpinning} from './store/actionCate'

class Index extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,    //编辑弹框显示
      query:'',
      cat_name:'',
      cat_id:0,
      pagenum:1,
      pagesize:10,
    }
  }     

  componentDidMount(){
    let pagenum=this.state.pagenum
    let pagesize=this.state.pagesize
    this.props.getCategoriesList({
      type:3,
      pagenum,
      pagesize
    })
    
  }
  //搜索框
  searchFn = (query) =>
  {
    if(query===''){
      let pagenum=this.state.pagenum
      let pagesize=this.state.pagesize
      this.props.getCategoriesList({
        type:3,
        pagenum,
        pagesize
      })
    }else{
      this.props.selectCat(query)
    }
   
  }

  //分页
  onShowSizeChange(pagenum, pagesize) {
   
    this.props.incrment()
    this.props.getCategoriesList({
      type:3,
      pagenum,
      pagesize
    })
  } 
  //显示弹框
  showEditTKFn = (a) => {
    this.setState({
      editVisible: true,
      cat_name:a.cat_name,
      cat_id:a.cat_id
    });
  };
  
  changeFn = (e) => {
    this.setState({
      cat_name: e.target.value
    })
  }

  // 删除确认
  deleteComfirmFn = a => {
    deleteGoodsCate(a)
    setTimeout(()=>{
      message.success('删除成功！');
      window.location.reload()
    },500)
    // console.log(a)
    
  }
  
  // 关闭弹框
  closeTKFn = () => {
    this.setState({
      editVisible: false
    });
  };

  // 表单提交处理
  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state.cat_id,this.state.cat_name)
    let cat_name = {
      cat_name:this.state.cat_name
    }
    if (cat_name === e.target.value) {
      return alert('内容相同')
    }
    setGoodsCate(this.state.cat_id, cat_name)
    .then(res => 
      {// console.log(res)
        if (res.meta.status !== 200){
          message.error('修改失败！');
          this.closeTKFn()
        } else {
          message.success('修改成功！');
          this.closeTKFn()
          window.location.reload()
        }
      }
    )
  };

  render () {
    const { editVisible } = this.state;

    //搜索框
    const { Search } = Input
    //表格数据
    const columns = [
      {
        title: '商品类别编号',
        dataIndex: 'cat_id',
        key: 'cat_id',
      }, 
      {
        title: '分类名称',
        dataIndex: 'cat_name',
        key: 'cat_name',
      },
      {
        title: '分类等级',
        dataIndex: 'cat_level',
        key: 'cat_level',
        render: cat_level => {
          let color,tagName
          switch(cat_level){
            case 0:
              color = 'magenta'
              tagName = '一级'
              break;
            case 1:
              color = 'lime'
              tagName = '二级'
              break;
            case 2:
              color = 'purple'
              tagName = '三级'
              break;
            default:
              break;
          }
          return(
          <span>
            <Tag color={color}>{tagName}</Tag>
          </span>
          )
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={this.showEditTKFn.bind(this,record)} shape="round" icon="edit" ></Button>
            <Divider type="vertical" />
            <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm= {()=>{this.deleteComfirmFn(record.cat_id)}}>
              <Button type="danger" shape="round" icon="delete" ></Button>
            </Popconfirm>
          </span>
        ),
      },
    ];
    //渲染页面
    return (
      <div className="getList">
        <Card title={
          <div>
            <span>商品分类展示</span>
            <Search
              placeholder="请输入商品类别编号"
              onSearch={(value) => this.searchFn(value) // value => console.log(value)
              }
              style={{ width: 200 ,float: 'right' ,marginRight: '30px'}}
            />
          </div>
          } extra={<Link to='/admin/addcate'><Button type="primary" onClick={this.showAddTKFn}>添加分类</Button></Link>} bordered={false}
        >
          <Spin tip="Loading..." spinning={this.props.loading}>
          {/* 分类表格(树形) */}
          <Table columns={columns} dataSource={this.props.categoriesList.result} pagination={false}
            rowKey = {row => row.cat_id}
          />
            <PageStyle>
                <Pagination
                    onChange={this.onShowSizeChange.bind(this)}
                    defaultCurrent={1}
                    total={this.props.total}
                />
            </PageStyle>
            </Spin>
        </Card>

        {/* 编辑分类弹框 */}
        <Modal
          title="编辑分类"
          visible={editVisible}
          // confirmLoading={confirmLoading}
          footer={null}
          closable= {false}
        >
          {/* <UpdateCat closeTKFn={this.closeTKFn} /> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="分类名称">
              <Input 
                value={this.state.cat_name}
                // onChange={(e) => this.changeFn(e)}
                onChange={this.changeFn.bind(this)}
                />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button style={{margin:'0 10px'}} onClick={this.closeTKFn}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => { // state就是仓库store数据
  // console.log( state.toJS().goodscate.goodscate)
  return { // 组件中通过 this.props.键 来获取数据
    categoriesList: state.toJS().goodscate.goodscate,
    total: state.toJS().goodscate.goodscate.total,
    loading:state.toJS().goodscate.loading
  }

}
const mapDispatchToProps= dispatch => {
  return {
    getCategoriesList: (query) => dispatch(getCategoriesList(query)),
    selectCat: (query) => dispatch(selectCate(query)),
    incrment: () => dispatch(changeSpinning())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
