import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

import { editRole } from './store/createAction'
import { Form, Input, Button,message,Card } from 'antd';
class RoleEd extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(this.props.roleId,'roleId'); 
                this.props.editRo(this.props.roleId,values)
                message.success('编辑成功');
                localStorage.setItem('b',111)
            }
        });
    };
    render() {
        if(localStorage.getItem('b')) {
            localStorage.removeItem('b')
            setTimeout(()=>{
                window.location.href='http://localhost:3000/admin/roles'
            },200)
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                 <Card title="角色编辑"  extra={<Link to='/admin/roles'><Button type="primary">退出</Button></Link>}>
                
                <br/>
                <br/>
                <br/>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                    <Form.Item label="角色名称">
                        {getFieldDecorator('roleName', {
                            rules: [{ required: true, message: '请输入角色名称' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="角色描述">
                        {getFieldDecorator('roleDesc', {
                            rules: [{ required: true, message: '请输入角色描述' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
const WrappedApp = Form.create({ name: 'coordinated' })(RoleEd);

const mapStateToProps = state => {
    // console.log(state.roleReducer.toJS().roleid,999)
    return {
        editRoleData: state.toJS().roleReducer,
        roleId:state.toJS().roleReducer.roleid.data4
    }
}
const mapDispatchToProps = dispatch => {
    return {
        editRo: (id,data) => dispatch(editRole(id,data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedApp)
