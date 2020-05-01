import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table,Tag,Card, } from 'antd';

import { addRights } from './store/createAction'




class Right extends Component {
    componentDidMount() {
        this.props.add()
    }
    
    render() {
        let rightData=this.props.rightData
        // if(rightData){    //赋key值给table
        //     rightData.forEach(element => {
        //         element.key=element.id
        //     });
        // }
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                // width: 150
            },
            {
                title: '权限名',
                dataIndex: 'authName',
                key: 'authName',
                // width: 150
            },
            {
                title: ' 等级',
                key: ' level',
                // width: 150,
                render: (text, record) => {
                    // console.log(record,'record')
                    let tagColor,tagName
                    switch(record.level){
                        case '0':tagColor="red";tagName='零级';break
                        case '1':tagColor="cyan";tagName='一级';break
                        case '2':tagColor="volcano";tagName='二级';break
                        default:break
                    }
                return(<Tag color={tagColor}>{tagName}</Tag>)
                }
            },
            {
                title: '权限编号',
                dataIndex: 'pid',
                key: 'pid',
                // width: 150
            },
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
                // width: 150
            },
        ];

        // console.log(rightData)
        return (
            <div>
                 <Card title="权限列表"  >
                <Table
                    columns={columns}
                    rowKey={row=>row.id}
                    // rowKey={(record, index) => index}
                    dataSource={rightData}
                    pagination={false}
                    scroll={{ y: 340 }}
                ></Table>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state.toJS().rightReducer.data.data)
    return {
        rightData: state.toJS().rightReducer.data.data
        // rightData: state.rightReducer.toJS()
    }
}
const mapDispatchToProps = dispatch => {

    return {
        add: () => dispatch(addRights(111))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Right)
