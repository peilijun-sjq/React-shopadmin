import React,{Component} from 'react';
import { Card,Input,Icon,Form,Button,Cascader,message,Upload } from 'antd';
import {getGoodsCateList,addGoods} from '../../../api';


import {
    Link
  } from 'react-router-dom';

class NormalLoginForm extends Component {

    constructor(props){
        super(props)
        this.state={
            goods_name:'',
            goods_price:'',
            goods_weight:'',
            goods_number:'',
            goods_cat:'',
            data:[]
        }     
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
          let addForm={
            goods_name:this.state.goods_name,
            goods_price:this.state.goods_price,
            goods_weight:this.state.goods_weight,
            goods_number:this.state.goods_number,
            goods_cat:this.state.goods_cat,
          }
          addGoods(addForm)
          .then(res=>{
            if(res.meta.status!==201){
                message.error('添加失败！！！！！');
              }else{
                message.success('添加成功！！！！！');
                  setTimeout(()=>{
                    this.props.history.push('/admin/goodslist')
                  },1000)
              }
          })
        }
      });
    };
  
    render() {
        const fileList = []
        const props = {
            action: 'http://localhost:8888/api/private/v1/upload',
            listType: 'picture',
            defaultFileList: [...fileList],
        };
        let options=this.state.data
        const { getFieldDecorator } = this.props.form;
        return (
        <Card title="商品添加"  extra={<Link to='/admin/goodslist'><Button type="dashed">返回</Button></Link>}>
           
            <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'300px',margin:'auto'}}>
                <Form.Item>
                    {getFieldDecorator('goods_name', {
                    rules: [{ required: true, message: '请填写商品名称' }],
                    })(
                    <Input
                        name='goods_name'
                        onChange={(e)=>this.changeFn(e)}
                        style={{marginTop:'20px'}}
                        size={"large"}
                        placeholder="商品名称"
                        prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('goods_price', {
                    rules: [{ required: true, message: '请填写价格' }],
                    })(
                    <Input
                        name='goods_price'
                        onChange={(e)=>this.changeFn(e)}
                        size={"large"}
                        placeholder="商品价格"
                        prefix={<Icon type="pound" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('goods_weight', {
                    rules: [{ required: true, message: '请填写重量' }],
                    })(
                    <Input
                        name='goods_weight'
                        onChange={(e)=>this.changeFn(e)}
                        size={"large"}
                        placeholder="商品重量"
                        prefix={<Icon type="gold" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('goods_number', {
                    rules: [{ required: true, message: '请填写数量' }],
                    })(
                    <Input
                        name='goods_number'
                        onChange={(e)=>this.changeFn(e)}
                        size={"large"}
                        placeholder="商品数量"
                        prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                
                <Form.Item>
                <Cascader
                        fieldNames={{ label: 'cat_name', value: 'cat_id', children: 'children' }}
                        options={options}
                        onChange={this.onChangeFn.bind(this)}
                        placeholder="分类"
                        
                    />,
                </Form.Item>
                <Upload {...props}>
                
                
                <Button style={{width:'300px',marginBottom:'20px'}}>
                    <Icon type="upload" /> 上传图片
                </Button>
                </Upload>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',marginRight:'50px'}}>
                    提交
                </Button>
                
            </Form>
        </Card>
      );
    }

    onChangeFn(value) {
        let goods_cat = value.join(',')  
        // console.log(goods_cat)
        this.setState({
            goods_cat
        })
        // console.log(this.state.goods_cat)
    }
      
    onChange(value, dateString) {
    }
    onOk(value) {
    }
    changeFn(e){
        // console.log(e.target.value)
        let value=e.target.value
        let name=e.target.name
        this.setState({
            [name]:value
        })
    }
    componentDidMount(){
        // console.log(this.props)
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
