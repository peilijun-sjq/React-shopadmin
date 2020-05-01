import React,{Component} from 'react';
import { Card,Input,Icon,Form,Button,Cascader,message } from 'antd';
import {getGoodsCateList,addGoodsCate} from '../../../api';
import {
    Link
  } from 'react-router-dom';

class NormalLoginForm extends Component {

    constructor(props){
        super(props)
        this.state={
            cat_pid:'',
            goods_cat:'',
            cat_name:'',
            cat_level:'',
            data:[]
        }     
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
          let addForm={
            cat_name:this.state.cat_name,
            cat_pid:this.state.cat_pid,
            cat_level:this.state.cat_level,
          }
          addGoodsCate(addForm)
          .then(res=>{
            if(res.meta.status!==201){
                message.error('添加失败！！！！！');
              }else{
                message.success('添加成功！！！！！');
                  setTimeout(()=>{
                    this.props.history.push('/admin/goodscate')
                  },500)
              }
          })
        }
      });
    };
  
    render() {
    let options=this.state.data
      const { getFieldDecorator } = this.props.form;
      return (
        <Card title="商品分类信息"  extra={<Link to='/admin/goodscate'><Button type="dashed">返回</Button></Link>}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('goods_name', {
                    rules: [{ required: true, message: '请填写商品名称' }],
                    })(
                    <Input
                        onChange={(e)=>this.changeFn(e)}
                        style={{marginTop:'20px'}}
                        size={"large"}
                        placeholder="分类名称"
                        prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                <Form.Item>
                <Cascader
                        fieldNames={{ label: 'cat_name', value: 'cat_id', children: 'children'}}
                        options={options}
                        onChange={this.onChangeFn.bind(this)}
                        placeholder="请选择分类"
                        style={{width:'200px'}}
                    />,
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100px'}}>
                    提交
                </Button>
            </Form>
        </Card>
      );
    }

    onChangeFn(a,b) {
        let cat_pid=a[1]
        let cat_level=b[1].cat_level
        this.setState({
            cat_pid,
            cat_level
        })
    }
      
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
    changeFn(e){
        // console.log(e.target.value)
        let value=e.target.value
        this.setState({
            cat_name:value
        })
    }
    componentDidMount(){
        // console.log(this.props)
        getGoodsCateList({type:2})
        .then(res=>{
            const data=res.data
            this.setState({
                data
            })
        })
    }
  }

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
