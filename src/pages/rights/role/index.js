import React, { Component } from 'react'

import {
    Table, Divider, 
    Modal, Button, //添加按钮
    Form, Input,message,//添加按钮内表单
    Card,Icon
} from 'antd';
import { addRoles, deleteRoles, } from '../../../api/index'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { showRoles, shootid, searcher } from './store/createAction'

class Roleadd extends Component {
    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.props, 'pppp');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                addRoles(values)
                    .then(res => {
                        // console.log(res,'res');
                        message.success('添加成功');
                        
                    })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.roleData,212);
        return (
            <div>
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
            </div>
        )
    }
}
const WrappedDe = Form.create({ name: 'coordinated' })(Roleadd);

class Role extends Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        this.props.showRoles()
    }
    //删除角色
    del(record) {
        // console.log(record.id,'id');     
        deleteRoles(record.id).then(res => {
            // console.log(res,'res');  
            if (res.meta.status === 200) {
                message.success('删除成功');
            }
            this.props.showRoles()
        })
    }
    //添加角色弹框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        // console.log(this.props,'this.props');
        this.setState({
            visible: false,
        });
        // this.props.history.push('/admin/roles')
        this.props.showRoles()
    };

    //发送编辑id
    bianji = (a) => {
        // console.log(a.id,'a.id')
        this.props.editid(a.id)
    }
    //根据ID搜索角色
    search = (a) => {
        // console.log(a,'aaa');
        // console.log(this.props,'aaa');
        this.props.sear(a)
        if (a ==='') {
            this.props.showRoles()
        }
    }
    //权限
    seeright = (value) => {
        // console.log(value)
        let roleTreeData=JSON.stringify(value)
        localStorage.setItem('roleTree',roleTreeData)
    }
   
    render() {
            const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '角色描述',
                dataIndex: 'roleDesc',
                key: 'roleDesc',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    // console.log(record.id,'0000')
                    (<div>
                        <span>
                            <Link to='/admin/roles/editor'>
                                <Button type="link" size='small' onClick={(e) => { this.bianji(record, e) }}>
                                <Icon type="edit" />
                            </Button>
                            </Link>
                            <Divider type="vertical" />
                            <Link to='/admin/roles/tree'>
                                <Button type="link" size='small' onClick={(e) => { this.seeright(record, e) }}>
                                <Icon type="lock" />
                        </Button>
                            </Link>
                            <Divider type="vertical" />
                            <Button type="link" size='small' onClick={(e) => { this.del(record, e) }}>
                            <Icon type="delete" />
                        </Button>
                            
                        </span>
                    </div>))
            },
        ];

        const roledata = this.props.roleData
        // console.log(this.props.roleData,'ppp');
        const { Search } = Input;//搜索

        return (
            <div>
                <Card title="角色列表"  >
                <Search
                    style={{ width: '300px' }}
                    placeholder="请输入ID"
                    enterButton
                    onSearch={this.search}
                />
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.showModal}>
                    添加角色
                </Button>

                <Modal
                    title="添加角色"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <WrappedDe />
                </Modal>

                <br />
                <br />
                <Table
                    columns={columns}
                    dataSource={roledata}
                    rowKey={() => Math.random() * 4444}
                    pagination={false}
                    childrenColumnName='child'
                    expandedRowRender={record => {
                        // console.log(record, 'record');
                            const columns2 = [
                                { title: 'id', dataIndex: 'id', key: 'id' },
                                { title: 'authName', dataIndex: 'authName', key: 'authName' },
                                { title: 'path', dataIndex: 'path', key: 'path' },
                              ];
                        
                            const data =record.children;
                            return <Table columns={columns2} dataSource={data} pagination={false} rowKey={() => Math.random() * 3456} />;
                    }}
                ></Table>,
                </Card>
            </div>
        )
    }
}



const mapStateToProps = state => {
    // console.log(state.toJS().roleReducer.roledata.data,22)
    return {
        roleData: state.toJS().roleReducer.roledata.data,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        showRoles: () => dispatch(showRoles(111)),
        editid: (id) => dispatch(shootid(id)),
        sear: (id) => dispatch(searcher(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Role)
