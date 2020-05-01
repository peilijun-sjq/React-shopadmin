import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,Spin } from 'antd';
import {LoginForm,LoginButton,LoginDiv} from './style';
// import {postLogin} from '../../api';
import {loginInCreator} from './store/actionCate';
//粒子特效
import ReactCanvasNest from 'react-canvas-nest';
//动画
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from 'react-redux'

import {
  Redirect
} from 'react-router-dom';

class NormalLoginForm extends Component {
    handleSubmit = e => {
      e.preventDefault(); 
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.setState({
            loading:true
          })
          setTimeout(()=>{
            this.props.loginInFn(values)
            this.setState({
              loading:false
            })
          },1000)
        }
      });
    };
    constructor(props){
      super(props)
      this.inputRef = React.createRef()
      this.state={
        loading:false
      }
    }
    componentDidMount(){
      this.inputRef.current.focus();
    }
    render() {
      if(this.props.loginStatus) return <Redirect to="/admin" /> 
      const { getFieldDecorator } = this.props.form;
      return (
        <LoginDiv>
         <ReactCanvasNest className = 'canvasNest' config = {{lineColor:'102,205,170',opacity:'0.7',count:'188',color: '255,255,0', }} style = {{ zIndex:99}} />
         <ReactCSSTransitionGroup
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={2500}
                    transitionLeaveTimeout={1500}
                    transitionName="animated"
                    style = {{ zIndex:'9999'}}
                  >
          <Spin tip="Loading..." spinning={this.state.loading}  >
            <LoginForm key="amache" className={`animated bounce`} >
                <h1 style={{textAlign:'center',fontSize:'30px'}}>React后台管理</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                    rules: [
                      {required: true, message: '请输入账号！' },
                      {pattern: '^[a-zA-Z0-9]*$', message: '只支持数字、英文，不区分大小写'}
                    ],
                    })(
                    <Input
                        ref={this.inputRef}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="账号"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }],
                    })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                    />,
                    )}
                </Form.Item>
                <LoginButton>
                <Form.Item>
                    {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                    })(<Checkbox style={{float:'left'}}>记住密码</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'212px',float:'right'}}>
                        登录
                        </Button>

                </Form.Item>
                </LoginButton>
                </Form>
            </LoginForm>
          </Spin>
</ReactCSSTransitionGroup>
          </LoginDiv>
      );
    }
   
  }
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = state => { // state就是仓库store数据
  return { // 组件中通过 this.props.键 来获取数据
      // 键: state.数据
      loginStatus:state.toJS().LoginReducer.loginStatus,
  }
}
const mapDispatchToProps= dispatch => {
  return { // 组件中通过this.props.键()
    // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
    // incrment: () => dispatch(incrment())
    loginInFn:params=>dispatch(loginInCreator(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
// export default WrappedNormalLoginForm
